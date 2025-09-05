import { mockAlerts } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Info, Siren } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

const severityIcons = {
  Critical: <Siren className="h-5 w-5 text-destructive" />,
  Medium: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
  Low: <Info className="h-5 w-5 text-blue-500" />,
};

const severityBadgeVariants = {
  Critical: 'destructive' as const,
  Medium: 'secondary' as const,
  Low: 'default' as const,
};

export default function ViewAlertsPage() {
  const patientAlerts = mockAlerts.filter(a => a.patientId === 'p1');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Your Alerts</h1>
        <p className="text-muted-foreground">A log of all health alerts and notifications.</p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Alerts History</CardTitle>
            <CardDescription>Review all notifications from the monitoring system.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
            {patientAlerts.length > 0 ? (
                patientAlerts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map(alert => (
                    <div key={alert.id} className={`flex items-start gap-4 rounded-lg border p-4 ${alert.severity === 'Critical' ? 'border-destructive bg-destructive/5' : ''}`}>
                        <span className="mt-1">{severityIcons[alert.severity]}</span>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <p className="font-semibold">{alert.message}</p>
                                <Badge variant={severityBadgeVariants[alert.severity]}>{alert.severity}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-10">
                    <p className="text-muted-foreground">You have no alerts at the moment.</p>
                </div>
            )}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
