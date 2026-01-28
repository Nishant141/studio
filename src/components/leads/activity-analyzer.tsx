'use client';
import React, { useState, useEffect } from 'react';
import { analyzeLeadActivities, AnalyzeLeadActivitiesOutput } from '@/ai/flows/analyze-lead-activities';
import { getActivitiesForLead } from '@/lib/api';
import type { Lead, Activity } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Loader2, AlertTriangle, Lightbulb, History } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

export function ActivityAnalyzer({ lead }: { lead: Lead }) {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalyzeLeadActivitiesOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isActivitiesLoading, setIsActivitiesLoading] = useState(true);

  useEffect(() => {
    setIsActivitiesLoading(true);
    getActivitiesForLead(lead.id)
      .then(setActivities)
      .finally(() => setIsActivitiesLoading(false));
  }, [lead.id]);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeLeadActivities({
        leadId: lead.id,
        activities: activities.map(a => ({ action: a.action, timestamp: a.timestamp })),
      });
      setAnalysis(result);
    } catch (e) {
      setError('Failed to analyze activities. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1">
      <div>
        <h3 className="font-semibold mb-2 flex items-center gap-2"><History className="h-4 w-4" />Recent Activities</h3>
        <ScrollArea className="h-72 rounded-md border p-2">
            {isActivitiesLoading ? (
                <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
            ) : activities.length > 0 ? (
                <div className="space-y-4">
                {activities.map((activity) => (
                    <div key={activity.id} className="text-sm">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                        {format(new Date(activity.timestamp), 'PPpp')}
                    </p>
                    </div>
                ))}
                </div>
            ) : (
                <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                    No activities found.
                </div>
            )}
        </ScrollArea>
      </div>
      <div className="space-y-4">
        <Button onClick={handleAnalyze} disabled={isLoading || isActivitiesLoading}>
          {isLoading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
          ) : (
            'Run AI Analysis'
          )}
        </Button>
        {analysis && (
          <div className="space-y-4 rounded-md border p-4">
            {analysis.isSuspicious && (
              <div>
                <h4 className="font-semibold flex items-center gap-2 text-amber-600"><AlertTriangle className="h-4 w-4" /> Suspicious Activity</h4>
                <Badge variant="destructive" className="my-2">Suspicious</Badge>
                <p className="text-sm text-muted-foreground">{analysis.reason}</p>
              </div>
            )}
             <Separator />
            <div>
              <h4 className="font-semibold flex items-center gap-2"><Lightbulb className="h-4 w-4" /> Suggested Actions</h4>
              <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
                {analysis.suggestedActions.map((action, index) => (
                  <li key={index}>{action}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    </div>
  );
}
