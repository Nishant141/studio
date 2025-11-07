// src/ai/ai-call-prompt.ts
'use server';

/**
 * @fileOverview Defines a Genkit flow for extracting a phone number from a natural language prompt using the Gemini API
 * and returning the extracted number.
 *
 * - `extractPhoneNumber`: Extracts a phone number from a natural language prompt.
 * - `ExtractPhoneNumberInput`: The input type for the `extractPhoneNumber` function.
 * - `ExtractPhoneNumberOutput`: The return type for the `extractPhoneNumber` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractPhoneNumberInputSchema = z.object({
  prompt: z
    .string()
    .describe('A natural language instruction to extract a phone number from, e.g., \'call 9876543210\''),
});
export type ExtractPhoneNumberInput = z.infer<typeof ExtractPhoneNumberInputSchema>;

const ExtractPhoneNumberOutputSchema = z.object({
  phoneNumber: z
    .string()
    .describe('The extracted phone number from the prompt, if found.  Should be in E.164 format.'),
});
export type ExtractPhoneNumberOutput = z.infer<typeof ExtractPhoneNumberOutputSchema>;

export async function extractPhoneNumber(input: ExtractPhoneNumberInput): Promise<ExtractPhoneNumberOutput> {
  return extractPhoneNumberFlow(input);
}

const extractPhoneNumberPrompt = ai.definePrompt({
  name: 'extractPhoneNumberPrompt',
  input: {schema: ExtractPhoneNumberInputSchema},
  output: {schema: ExtractPhoneNumberOutputSchema},
  prompt: `You are a helpful AI assistant whose sole job is to extract a phone number from a user's prompt, if one exists.\n\nUser Prompt: {{{prompt}}}\n\nIf a phone number is found, extract it and return it in E.164 format. If a phone number is not found, return an empty string for phoneNumber. Do not add any additional text or explanation.  Just return the JSON.`,
});

const extractPhoneNumberFlow = ai.defineFlow(
  {
    name: 'extractPhoneNumberFlow',
    inputSchema: ExtractPhoneNumberInputSchema,
    outputSchema: ExtractPhoneNumberOutputSchema,
  },
  async input => {
    const {output} = await extractPhoneNumberPrompt(input);
    return output!;
  }
);
