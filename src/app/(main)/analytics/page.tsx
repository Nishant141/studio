import { OverviewChart } from '@/components/dashboard/overview-chart';
import { SourceChart } from '@/components/dashboard/source-chart';

export default function AnalyticsPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-headline">Analytics</h1>
             <div className="grid gap-8 md:grid-cols-1">
                 <div className="lg:col-span-4">
                    <OverviewChart />
                </div>
                <div className="lg:col-span-3">
                    <SourceChart />
                </div>
            </div>
            {/* More detailed charts and analytics can be added here */}
            <div className="text-center text-muted-foreground py-10">
                <p>More detailed analytics coming soon.</p>
            </div>
        </div>
    );
}
