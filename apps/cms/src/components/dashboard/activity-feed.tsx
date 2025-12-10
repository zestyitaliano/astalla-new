import { Card } from "@astalla/ui";
import { CheckCircle2, FileText, Image as ImageIcon } from "lucide-react";

const ACTIVITIES = [
    {
        id: 1,
        user: "Admin",
        action: "updated the homepage",
        target: "Hero Section",
        time: "2 hours ago",
        icon: FileText,
        color: "text-blue-500 bg-blue-50",
    },
    {
        id: 2,
        user: "Admin",
        action: "uploaded new photos",
        target: "Pool Area",
        time: "4 hours ago",
        icon: ImageIcon,
        color: "text-purple-500 bg-purple-50",
    },
    {
        id: 3,
        user: "System",
        action: "backup completed",
        target: "Daily Snapshot",
        time: "12 hours ago",
        icon: CheckCircle2,
        color: "text-emerald-500 bg-emerald-50",
    },
];

export function ActivityFeed() {
    return (
        <Card title="Recent Activity" className="h-full">
            <div className="space-y-6">
                {ACTIVITIES.map((activity) => (
                    <div key={activity.id} className="flex gap-4">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${activity.color}`}>
                            <activity.icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                {activity.user} <span className="font-normal text-zinc-500">{activity.action}</span>
                            </p>
                            <p className="text-xs text-zinc-500 mt-0.5">
                                {activity.target} • {activity.time}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
