'use server';

import { chatbotSymptomDiagnosis } from '@/ai/flows/chatbot-symptom-diagnosis';
import type { ChatbotSymptomDiagnosisInput } from '@/ai/flows/chatbot-symptom-diagnosis';

export async function getDiagnosis(input: ChatbotSymptomDiagnosisInput) {
  try {
    const output = await chatbotSymptomDiagnosis(input);
    return {
      diagnosis: output.diagnosis,
      isEmergency: output.isEmergency,
    };
  } catch (error) {
    console.error('Error in chatbotSymptomDiagnosis flow:', error);
    return {
      diagnosis: "I'm sorry, but I encountered an error. Please try again later or contact a medical professional directly if you have urgent concerns.",
      isEmergency: false,
    };
  }
}
