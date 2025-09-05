'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, Loader2, Siren } from 'lucide-react';

const vitalsSchema = z.object({
  heartRate: z.coerce.number().min(30, "Too low").max(220, "Too high"),
  spo2: z.coerce.number().min(80, "Too low").max(100, "Too high"),
  temperature: z.coerce.number().min(35, "Too low").max(43, "Too high"),
  respiratoryRate: z.coerce.number().min(5, "Too low").max(40, "Too high"),
});

type Prediction = 'Normal' | 'Critical' | null;

export default function RecordVitalsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<Prediction>(null);

  const form = useForm<z.infer<typeof vitalsSchema>>({
    resolver: zodResolver(vitalsSchema),
  });

  function onSubmit(values: z.infer<typeof vitalsSchema>) {
    setIsLoading(true);
    setPrediction(null);
    console.log(values);

    // Simulate ML prediction
    setTimeout(() => {
      const isCritical = values.heartRate > 100 || values.spo2 < 94 || values.temperature > 38 || values.respiratoryRate > 20;
      setPrediction(isCritical ? 'Critical' : 'Normal');
      setIsLoading(false);
      form.reset();
    }, 1500);
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Record Vitals</h1>
        <p className="text-muted-foreground">Enter your current health metrics below.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vitals Form</CardTitle>
          <CardDescription>Please provide accurate measurements.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="heartRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Heart Rate (bpm)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 75" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="spo2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SpO2 (%)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 98" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="temperature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Temperature (°C)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" placeholder="e.g., 37.0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="respiratoryRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Respiratory Rate</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 16" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Vitals
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {prediction && (
        <Alert variant={prediction === 'Critical' ? 'destructive' : 'default'} className={prediction === 'Normal' ? 'bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700' : ''}>
          {prediction === 'Critical' ? <Siren className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
          <AlertTitle className={prediction === 'Normal' ? 'text-green-900 dark:text-green-100' : ''}>
            Prediction Result: {prediction}
          </AlertTitle>
          <AlertDescription className={prediction === 'Normal' ? 'text-green-800 dark:text-green-200' : ''}>
            {prediction === 'Critical' 
              ? 'Your vitals appear to be outside the normal range. A doctor has been notified. Please monitor your condition closely.'
              : 'Your vitals are within the normal range. Keep up the good work!'}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
