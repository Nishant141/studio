'use server';
/**
 * @fileOverview A Genkit flow for scraping data from LinkedIn profile URLs.
 *
 * - scrapeLinkedInProfiles - A function that takes LinkedIn URLs and returns scraped profile data.
 * - ScrapeLinkedInProfilesInput - The input type for the scrapeLinkedInProfiles function.
 * - ScrapeLinkedInProfilesOutput - The return type for the scrapeLinkedInProfiles function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ProfileSchema = z.object({
  name: z.string().describe("The person's full name."),
  title: z.string().describe("The person's current job title and company."),
  location: z.string().describe("The person's general location (e.g., 'City, State')."),
  url: z.string().url().describe('The original LinkedIn profile URL.'),
  summary: z.string().describe("A brief 1-2 sentence summary of the person's professional background based on their title."),
});

const ScrapeLinkedInProfilesInputSchema = z.object({
  urls: z.array(z.string().url()).describe('An array of LinkedIn profile URLs to scrape.'),
});
export type ScrapeLinkedInProfilesInput = z.infer<typeof ScrapeLinkedInProfilesInputSchema>;

const ScrapeLinkedInProfilesOutputSchema = z.object({
    profiles: z.array(ProfileSchema).describe('An array of scraped profile objects.'),
});
export type ScrapeLinkedInProfilesOutput = z.infer<typeof ScrapeLinkedInProfilesOutputSchema>;


export async function scrapeLinkedInProfiles(input: ScrapeLinkedInProfilesInput): Promise<ScrapeLinkedInProfilesOutput> {
  return scrapeLinkedInProfilesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'scrapeLinkedInProfilesPrompt',
  input: { schema: ScrapeLinkedInProfilesInputSchema },
  output: { schema: ScrapeLinkedInProfilesOutputSchema },
  prompt: `You are an expert LinkedIn profile scraper. Your task is to extract key information from a list of fictitious LinkedIn profile URLs.

For each URL provided, generate a realistic-looking but FAKE profile. Do not use real people.

The output for each profile must include:
- A plausible-sounding full name.
- A job title and a well-known tech company (e.g., "Senior Software Engineer at Google").
- A location (e.g., "San Francisco Bay Area").
- The original URL.
- A short, 1-2 sentence professional summary.

Return the data as a JSON object that adheres to the output schema.

Profile URLs to process:
{{#each urls}}
- {{{this}}}
{{/each}}
`,
});

const scrapeLinkedInProfilesFlow = ai.defineFlow(
  {
    name: 'scrapeLinkedInProfilesFlow',
    inputSchema: ScrapeLinkedInProfilesInputSchema,
    outputSchema: ScrapeLinkedInProfilesOutputSchema,
  },
  async (input) => {
    // In a real-world scenario, you might fetch the content of each URL here.
    // For this example, we'll rely on the LLM to generate plausible fake data based on the URLs.
    const { output } = await prompt(input);
    return output!;
  }
);
