import { StatCard } from '@/components/dashboard/stat-card';
import { AIPrompt } from '@/components/dashboard/ai-prompt';
import { PhoneOutgoing, Percent, FilePenLine } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-4xl font-bold text-foreground">Welcome to AeroAutomateAI</h1>
        <p className="text-muted-foreground mt-2 text-lg">Your AI-powered sales and marketing co-pilot.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Calls Made"
          value="1,287"
          icon={<PhoneOutgoing className="w-6 h-6 text-primary" />}
          description="Total automated calls initiated this month."
        />
        <StatCard
          title="Call Success Rate"
          value="82%"
          icon={<Percent className="w-6 h-6 text-primary" />}
          description="Percentage of calls successfully connected."
        />
        <StatCard
          title="Articles Generated"
          value="42"
          icon={<FilePenLine className="w-6 h-6 text-primary" />}
          description="AI-generated articles published."
        />
      </div>

      <AIPrompt />

    </div>
  );
}
