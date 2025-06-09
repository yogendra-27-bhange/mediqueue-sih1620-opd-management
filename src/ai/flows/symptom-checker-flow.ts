'use server';
/**
 * @fileOverview A symptom checker AI agent.
 *
 * - checkSymptoms - A function that analyzes symptoms and provides guidance.
 * - SymptomCheckerInput - The input type for the checkSymptoms function.
 * - SymptomCheckerOutput - The return type for the checkSymptoms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SymptomCheckerInputSchema = z.object({
  symptomsDescription: z.string().min(10, {message: "Please describe your symptoms in at least 10 characters."}).describe('A textual description of the patient\'s symptoms.'),
});
export type SymptomCheckerInput = z.infer<typeof SymptomCheckerInputSchema>;

const SymptomCheckerOutputSchema = z.object({
  suggestedDepartments: z.string().describe('Textual suggestions for potentially relevant hospital departments based on the symptoms.'),
  urgencyAssessment: z.string().describe('A general assessment of the urgency for seeking medical attention.'),
  disclaimer: z.string().describe('A standard medical disclaimer.'),
});
export type SymptomCheckerOutput = z.infer<typeof SymptomCheckerOutputSchema>;

export async function checkSymptoms(input: SymptomCheckerInput): Promise<SymptomCheckerOutput> {
  return symptomCheckerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'symptomCheckerPrompt',
  input: {schema: SymptomCheckerInputSchema},
  output: {schema: SymptomCheckerOutputSchema},
  prompt: `You are an AI assistant for a hospital helping patients understand their symptoms. You are NOT a medical professional and CANNOT give a diagnosis.

Analyze the following symptoms:
"{{{symptomsDescription}}}"

Based on these symptoms:
1.  Suggest potentially relevant hospital departments the patient might consider consulting. Frame this as a general suggestion, not a definitive referral. For example: "Based on your symptoms, you might consider consulting with..." or "Symptoms like these are often addressed by...".
2.  Provide a general assessment of urgency. For example: "It may be advisable to consult a healthcare professional soon," or "If symptoms are severe or worsen rapidly, please seek immediate medical attention." Avoid specific timelines unless very general (e.g., "within the next few days").
3.  ALWAYS include the following disclaimer: "This is an AI-powered symptom checker and not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition."

Structure your response according to the SymptomCheckerOutputSchema.
`,
});

const symptomCheckerFlow = ai.defineFlow(
  {
    name: 'symptomCheckerFlow',
    inputSchema: SymptomCheckerInputSchema,
    outputSchema: SymptomCheckerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    // Ensure a disclaimer is always present, even if the model somehow forgets.
    if (output && !output.disclaimer) {
        output.disclaimer = "This is an AI-powered symptom checker and not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.";
    }
    return output!;
  }
);
