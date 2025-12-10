"use client";

import { Shell, Card } from "@astalla/ui";
import { Link, TrendingUp, Home, Users, Clock } from "lucide-react";
import { COLLECTIONS } from "@astalla/types";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { StatCard } from "@/components/dashboard/stat-card";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { AnalyticsChart } from "@/components/dashboard/analytics-chart";

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    const [stats, setStats] = useState({
        amenities: 0,
        gallery: 0,
        neighborhood: 0
    });

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        } else if (user) {
            // Fetch stats
            Promise.all([
                getCountFromServer(collection(db, COLLECTIONS.AMENITIES)),
                getCountFromServer(collection(db, COLLECTIONS.GALLERY)),
                getCountFromServer(collection(db, COLLECTIONS.NEIGHBORHOOD))
            ]).then(([amenitiesSnap, gallerySnap, neighborhoodSnap]) => {
                setStats({
                    amenities: amenitiesSnap.data().count,
                    gallery: gallerySnap.data().count,
                    neighborhood: neighborhoodSnap.data().count
                });
            });
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <Shell
            header={<DashboardHeader title="Overview" subtitle="Welcome back to your property dashboard." />}
            sidebar={<DashboardSidebar />}
        >
            <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Amenities" value={stats.amenities.toString()} trend="Total count" trendUp={true} icon={Home} />
                    <StatCard title="Gallery Images" value={stats.gallery.toString()} trend="Total count" trendUp={true} icon={Users} />
                    <StatCard title="Neighborhood" value={stats.neighborhood.toString()} trend="Total count" trendUp={true} icon={TrendingUp} />
                    <StatCard title="Last Updated" value="Just now" trend="Synced" trendUp={true} icon={Clock} />
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
