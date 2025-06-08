'use server';

/**
 * @fileOverview Implements the Smart Slot Allocation flow for optimizing appointment scheduling.
 *
 * - suggestOptimalSlots - Suggests optimal appointment slots based on doctor availability, patient load, and appointment durations.
 * - SmartSlotAllocationInput - The input type for the suggestOptimalSlots function.
 * - SmartSlotAllocationOutput - The return type for the suggestOptimalSlots function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartSlotAllocationInputSchema = z.object({
  doctorAvailability: z
    .string()
    .describe('The availability of doctors, including their working hours and days.'),
  patientLoadPatterns: z
    .string()
    .describe('Historical data on patient load, including peak hours and days.'),
  averageAppointmentDuration: z
    .string()
    .describe('The average duration of appointments for different specialties.'),
  unusualPatternsDetected: z.string().describe('Description of unusual patient load patterns detected.'),
});
export type SmartSlotAllocationInput = z.infer<typeof SmartSlotAllocationInputSchema>;

const SmartSlotAllocationOutputSchema = z.object({
  suggestedSlots: z
    .string()
    .describe(
      'A list of suggested appointment slots, optimized for reducing wait times and maximizing scheduling efficiency.'
    ),
  suggestedAvailabilityUpdates: z
    .string()
    .describe(
      'Suggestions for updating doctor availability based on unusual patient load patterns, including specific specialties and average appointment times.'
    ),
});
export type SmartSlotAllocationOutput = z.infer<typeof SmartSlotAllocationOutputSchema>;

export async function suggestOptimalSlots(input: SmartSlotAllocationInput): Promise<SmartSlotAllocationOutput> {
  return smartSlotAllocationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartSlotAllocationPrompt',
  input: {schema: SmartSlotAllocationInputSchema},
  output: {schema: SmartSlotAllocationOutputSchema},
  prompt: `You are an AI assistant designed to optimize hospital OPD appointment scheduling.

  Analyze the provided data to suggest optimal appointment slots and recommend updates to doctor availability.

  Consider the following factors:
  - Doctor Availability: {{{doctorAvailability}}}
  - Patient Load Patterns: {{{patientLoadPatterns}}}
  - Average Appointment Duration: {{{averageAppointmentDuration}}}
  - Unusual Patient Load Patterns Detected: {{{unusualPatternsDetected}}}

  Based on this information, suggest specific appointment slots that would minimize patient wait times and maximize scheduling efficiency.
  Also, if unusual patient load patterns are detected, suggest updates to doctor availability, taking into account different specialties and average appointment times.
  Return the suggested slots and availability updates in a clear, concise format.
  `,
});

const smartSlotAllocationFlow = ai.defineFlow(
  {
    name: 'smartSlotAllocationFlow',
    inputSchema: SmartSlotAllocationInputSchema,
    outputSchema: SmartSlotAllocationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
