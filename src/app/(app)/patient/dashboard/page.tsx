import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/providers/auth-provider';
import { ArrowRight, Bot, HeartPulse, Siren } from 'lucide-react';
import Link from 'next/link';

const actionCards = [
    { title: "Record Vitals", description: "Submit your latest health metrics.", href: "/patient/vitals", icon: HeartPulse, color: "text-blue-500" },
    { title: "View Alerts", description: "Check for any important notifications.", href: "/patient/alerts", icon: Siren, color: "text-red-500" },
    { title: "Symptom Checker", description: "Use our AI to check your symptoms.", href: "/chatbot", icon: Bot, color: "text-green-500" },
]

export default function PatientDashboard() {
  const { user } = useAuth();
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome, {user?.username || 'Patient'}!</h1>
        <p className="text-muted-foreground">Your personal health dashboard.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {actionCards.map(card => (
            <Card key={card.href} className="group transition-all hover:shadow-lg hover:-translate-y-1">
                <Link href={card.href}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                        <card.icon className={`h-5 w-5 ${card.color}`} />
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{card.description}</p>
                        <div className="mt-4 flex items-center text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                            Go <ArrowRight className="ml-1 h-4 w-4" />
                        </div>
                    </CardContent>
                </Link>
            </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>A summary of your recent health events.</CardDescription>
        </CardHeader>
        <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="font-semibold text-foreground">Vitals recorded:</span> Today at 8:00 AM. Status: Normal.</li>
                <li><span className="font-semibold text-foreground">New alert:</span> Yesterday at 3:15 PM. Severity: Low.</li>
                <li><span className="font-semibold text-foreground">Chatbot session:</span> 2 days ago.</li>
            </ul>
        </CardContent>
      </Card>
    </div>
  );
}
