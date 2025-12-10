import { Card } from "@astalla/ui";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    icon?: React.ElementType;
}

export function StatCard({ title, value, trend, trendUp, icon: Icon }: StatCardProps) {
    return (
        <Card className="flex flex-col justify-between h-full transition-all duration-200 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
                <span className="text-sm font-medium text-zinc-500">{title}</span>
                {Icon && (
                    <div className="p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                        <Icon className="w-4 h-4 text-zinc-400" />
                    </div>
                )}
            </div>

            <div className="flex items-end justify-between">
                <div className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 font-display">
                    {value}
                </div>
                {trend && (
                    <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${trendUp
                            ? "text-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400"
                            : "text-red-700 bg-red-50 dark:bg-red-900/20 dark:text-red-400"
                        }`}>
                        {trendUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                        {trend}
                    </div>
                )}
            </div>
        </Card>
    );
}
