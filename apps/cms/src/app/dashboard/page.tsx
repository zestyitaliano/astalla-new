"use client";

import { Shell, Card } from "@astalla/ui";
import { Link, TrendingUp, Home, Users, Clock } from "lucide-react";
import { COLLECTIONS } from "@astalla/types";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { StatCard } from "@/components/dashboard/stat-card";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { AnalyticsChart } from "@/components/dashboard/analytics-chart";

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!user) return null;

    if (!user) return null;

    return (
        <Shell
            header={<DashboardHeader />}
            sidebar={<DashboardSidebar />}
        >
            <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total Views" value="24.5k" trend="+12%" trendUp={true} icon={TrendingUp} />
                    <StatCard title="Active Listings" value="12" trend="+2" trendUp={true} icon={Home} />
                    <StatCard title="Inquiries" value="48" trend="+18%" trendUp={true} icon={Users} />
                    <StatCard title="Avg. Time" value="2m 45s" trend="-5%" trendUp={false} icon={Clock} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Chart */}
                    <div className="lg:col-span-2 h-full">
                        <AnalyticsChart />
                    </div>

                    {/* Activity Feed */}
                    <div className="lg:col-span-1 h-full">
                        <ActivityFeed />
                    </div>
                </div>
            </div>
        </Shell>
    );
}
