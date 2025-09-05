import { ChatLayout } from "@/components/chatbot/chat-layout";

export default function ChatbotPage() {
  return (
    <div className="h-full max-h-[calc(100vh-10rem)] flex flex-col">
       <div className="mb-4">
        <h1 className="text-3xl font-bold">AI Symptom Checker</h1>
        <p className="text-muted-foreground">Describe your symptoms to get an initial analysis. This is not a substitute for professional medical advice.</p>
      </div>
      <ChatLayout />
    </div>
  );
}
