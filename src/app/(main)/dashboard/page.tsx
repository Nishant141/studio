import { StatCard } from '@/components/dashboard/stat-card';
import { OverviewChart } from '@/components/dashboard/overview-chart';
import { SourceChart } from '@/components/dashboard/source-chart';
import { getAnalyticsSummary } from '@/lib/api';
import { DollarSign, Users, Activity, BarChart } from 'lucide-react';

export default async function DashboardPage() {
    const summary = await getAnalyticsSummary();

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Leads"
                    value={summary.totalLeads.value.toLocaleString()}
                    change={summary.totalLeads.change}
                    icon={Users}
                />
                <StatCard
                    title="Conversion Rate"
                    value={`${summary.conversionRate.value.toFixed(1)}%`}
                    change={summary.conversionRate.change}
                    icon={BarChart}
                />
                <StatCard
                    title="New Leads (Month)"
                    value={summary.newLeads.value.toLocaleString()}
                    change={summary.newLeads.change}
                    icon={Activity}
                />
                 <StatCard
                    title="Deals Won"
                    value={summary.wonDeals.value.toLocaleString()}
                    change={summary.wonDeals.change}
                    icon={DollarSign}
                />
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
                <div className="lg:col-span-4">
                    <OverviewChart />
                </div>
                <div className="lg:col-span-3">
                    <SourceChart />
                </div>
            </div>
        </div>
    );
}
