'use server';

/**
 * @fileOverview An AI article generator flow that uses the Gemini API to create structured blog content.
 *
 * - generateArticle - A function that generates blog content based on a title and optional notes.
 * - GenerateArticleInput - The input type for the generateArticle function.
 * - GenerateArticleOutput - The return type for the generateArticle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateArticleInputSchema = z.object({
  title: z.string().describe('The title of the article to generate.'),
  notes: z.string().optional().describe('Optional notes to guide the article generation.'),
});

export type GenerateArticleInput = z.infer<typeof GenerateArticleInputSchema>;

const GenerateArticleOutputSchema = z.object({
  content: z.string().describe('The generated article content.'),
});

export type GenerateArticleOutput = z.infer<typeof GenerateArticleOutputSchema>;

export async function generateArticle(input: GenerateArticleInput): Promise<GenerateArticleOutput> {
  return generateArticleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateArticlePrompt',
  input: {schema: GenerateArticleInputSchema},
  output: {schema: GenerateArticleOutputSchema},
  prompt: `You are an expert blog content creator.

  Based on the title and any provided notes, generate a well-structured and engaging blog article.
  Include appropriate headings and sections to enhance readability.

  Title: {{{title}}}
  Notes: {{{notes}}}

  Article Content:`,
});

const generateArticleFlow = ai.defineFlow(
  {
    name: 'generateArticleFlow',
    inputSchema: GenerateArticleInputSchema,
    outputSchema: GenerateArticleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
