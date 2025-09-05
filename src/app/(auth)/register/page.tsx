import { RegisterForm } from '@/components/auth/register-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Stethoscope } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <div className="mb-4 flex justify-center">
          <Stethoscope className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl">Create an Account</CardTitle>
        <CardDescription>
          Fill in the details below to join SPMR Monitor
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Log In
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
