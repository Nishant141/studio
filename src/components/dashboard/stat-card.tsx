import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type StatCardProps = {
    title: string;
    value: string;
    change: number;
    icon: LucideIcon;
};

export function StatCard({ title, value, change, icon: Icon }: StatCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className={cn("text-xs text-muted-foreground", change >= 0 ? "text-green-500" : "text-red-500")}>
                    {change >= 0 ? '+' : ''}{change.toFixed(1)}% from last month
                </p>
            </CardContent>
        </Card>
    )
}
