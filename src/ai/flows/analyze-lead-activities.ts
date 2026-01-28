'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing lead activities to identify suspicious behavior or suggest follow-up actions.
 *
 * - analyzeLeadActivities - A function that analyzes lead activities and returns insights.
 * - AnalyzeLeadActivitiesInput - The input type for the analyzeLeadActivities function.
 * - AnalyzeLeadActivitiesOutput - The return type for the analyzeLeadActivities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeLeadActivitiesInputSchema = z.object({
  leadId: z.string().describe('The ID of the lead to analyze.'),
  activities: z.array(
    z.object({
      action: z.string(),
      timestamp: z.string(),
    })
  ).describe('The list of activities associated with the lead.'),
});
export type AnalyzeLeadActivitiesInput = z.infer<typeof AnalyzeLeadActivitiesInputSchema>;

const AnalyzeLeadActivitiesOutputSchema = z.object({
  isSuspicious: z.boolean().describe('Whether the lead activities are potentially suspicious.'),
  suggestedActions: z.array(z.string()).describe('Suggested follow-up actions for the lead.'),
  reason: z.string().optional().describe('Reasoning behind the analysis and suggested actions.'),
});
export type AnalyzeLeadActivitiesOutput = z.infer<typeof AnalyzeLeadActivitiesOutputSchema>;

export async function analyzeLeadActivities(
  input: AnalyzeLeadActivitiesInput
): Promise<AnalyzeLeadActivitiesOutput> {
  return analyzeLeadActivitiesFlow(input);
}

const analyzeLeadActivitiesPrompt = ai.definePrompt({
  name: 'analyzeLeadActivitiesPrompt',
  input: {schema: AnalyzeLeadActivitiesInputSchema},
  output: {schema: AnalyzeLeadActivitiesOutputSchema},
  prompt: `You are an AI assistant specialized in analyzing sales lead activities.
  Your goal is to identify potentially suspicious behavior or suggest optimal follow-up actions
  based on the provided lead activities.

  Lead ID: {{{leadId}}}

  Activities:
  {{#each activities}}
  - Action: {{{action}}}, Timestamp: {{{timestamp}}}
  {{/each}}

  Based on these activities, determine if there's any suspicious behavior.
  If so, set isSuspicious to true and provide a reason in the reason field.

  Suggest follow-up actions that could improve conversion rates, setting suggestedActions with appropriate actions.
`,
});

const analyzeLeadActivitiesFlow = ai.defineFlow(
  {
    name: 'analyzeLeadActivitiesFlow',
    inputSchema: AnalyzeLeadActivitiesInputSchema,
    outputSchema: AnalyzeLeadActivitiesOutputSchema,
  },
  async input => {
    const {output} = await analyzeLeadActivitiesPrompt(input);
    return output!;
  }
);
