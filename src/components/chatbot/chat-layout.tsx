'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { getDiagnosis } from '@/app/actions/chatbot';
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2, Send, User, Bot, Siren } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAuth } from '@/providers/auth-provider';

type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  isEmergency?: boolean;
};

export function ChatLayout() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'assistant',
      content: "Hello! I'm your AI health assistant. How are you feeling today? Please describe your symptoms.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const getInitials = (name: string) => name.split(' ').map((n) => n[0]).join('').toUpperCase();

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const response = await getDiagnosis({ symptoms: input });

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response.diagnosis,
      role: 'assistant',
      isEmergency: response.isEmergency,
    };
    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex h-full flex-col rounded-lg border bg-card">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex items-start gap-4',
                message.role === 'user' && 'justify-end'
              )}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-md rounded-lg p-3 text-sm',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : message.isEmergency 
                    ? 'bg-destructive/10 border border-destructive text-destructive-foreground'
                    : 'bg-muted',
                  {'flex items-start gap-2': message.isEmergency}
                )}
              >
                {message.isEmergency && <Siren className="h-5 w-5 mt-0.5 flex-shrink-0 text-destructive" />}
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === 'user' && user && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://picsum.photos/seed/${user.id}/100/100`} data-ai-hint="profile picture" />
                  <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3">
                    <Loader2 className="h-5 w-5 animate-spin" />
                </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., I have a headache and a fever..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
