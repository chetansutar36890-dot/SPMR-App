'use server';

/**
 * @fileOverview A chatbot that provides potential diagnoses or recommendations based on user-inputted symptoms.
 *
 * - chatbotSymptomDiagnosis - A function that handles the symptom diagnosis process.
 * - ChatbotSymptomDiagnosisInput - The input type for the chatbotSymptomDiagnosis function.
 * - ChatbotSymptomDiagnosisOutput - The return type for the chatbotSymptomDiagnosis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotSymptomDiagnosisInputSchema = z.object({
  symptoms: z.string().describe('The symptoms reported by the user.'),
});
export type ChatbotSymptomDiagnosisInput = z.infer<typeof ChatbotSymptomDiagnosisInputSchema>;

const ChatbotSymptomDiagnosisOutputSchema = z.object({
  diagnosis: z.string().describe('The potential diagnoses or recommendations.'),
  isEmergency: z.boolean().describe('Whether the situation is an emergency.'),
});
export type ChatbotSymptomDiagnosisOutput = z.infer<typeof ChatbotSymptomDiagnosisOutputSchema>;

export async function chatbotSymptomDiagnosis(
  input: ChatbotSymptomDiagnosisInput
): Promise<ChatbotSymptomDiagnosisOutput> {
  return chatbotSymptomDiagnosisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotSymptomDiagnosisPrompt',
  input: {schema: ChatbotSymptomDiagnosisInputSchema},
  output: {schema: ChatbotSymptomDiagnosisOutputSchema},
  prompt: `You are a helpful chatbot that provides potential diagnoses or recommendations based on user-reported symptoms.
  If the reported symptoms indicate a potential emergency, highlight the response in red and set isEmergency to true.

  Symptoms: {{{symptoms}}}
  `,
});

const chatbotSymptomDiagnosisFlow = ai.defineFlow(
  {
    name: 'chatbotSymptomDiagnosisFlow',
    inputSchema: ChatbotSymptomDiagnosisInputSchema,
    outputSchema: ChatbotSymptomDiagnosisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
