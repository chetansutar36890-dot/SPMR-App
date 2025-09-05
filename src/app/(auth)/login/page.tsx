import { LoginForm } from '@/components/auth/login-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Stethoscope } from 'lucide-react';
import Link from 'next/link';

const Logo = () => (
  <svg width="60" height="60" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" rx="40" fill="hsl(var(--primary))"/>
    <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontSize="60" fontWeight="bold" fill="white" dy=".1em">
      SPMR
    </text>
  </svg>
);


export default function LoginPage() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <div className="mb-4 flex justify-center">
          <Logo />
        </div>
        <CardTitle className="text-2xl">SPMR Monitor</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Register
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
