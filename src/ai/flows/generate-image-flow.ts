'use server';
/**
 * @fileOverview A Genkit flow for generating an image based on a text prompt.
 *
 * - generateImage - A function that takes a prompt and returns a data URI for the generated image.
 * - GenerateImageInput - The input type for the generateImage function.
 * - GenerateImageOutput - The return type for the generateImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateImageInputSchema = z.object({
  prompt: z.string().describe('A text prompt to generate an image from.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.'),
  imageHint: z.string().describe('A two-word hint based on the prompt for AI assistance.'),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(
  input: GenerateImageInput
): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateImagePrompt',
  input: { schema: GenerateImageInputSchema },
  output: { schema: z.object({imageHint: z.string()})},
  prompt: `Generate a two-word, lowercase, space-separated hint for an AI image search based on the following blog title: {{{prompt}}}. Example: 'cloud computing'.`
});

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: `Generate a photorealistic, professional blog post header image for an article titled "${input.prompt}". The image should be visually appealing, high-resolution, and relevant to the topic. Do not include any text or words in the image.`,
    });

    if (!media?.url) {
      throw new Error('Image generation failed to return a valid URL.');
    }
    
    const hintResult = await prompt(input);
    const imageHint = hintResult.output?.imageHint || 'technology abstract';

    return {
      imageUrl: media.url,
      imageHint: imageHint,
    };
  }
);
