"use client";

import { Shell, Card } from "@astalla/ui";
import { Link } from "lucide-react";
import { COLLECTIONS } from "@astalla/types";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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

    return (
        <Shell
            header={
                <div className="flex items-center justify-between w-full">
                    <h1 className="text-xl font-bold">Dashboard</h1>
                    <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                </div>
            }
            sidebar={
                <nav className="space-y-1">
                    {Object.entries(COLLECTIONS).map(([key, value]) => (
                        <a
                            key={key}
                            href={`/dashboard/${value}`}
                            className="block px-3 py-2 text-sm font-medium rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                            {key.replace("_", " ")}
                        </a>
                    ))}
                </nav>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card title="Welcome Back">
                    <p className="text-zinc-500">Select a collection from the sidebar to start editing content.</p>
                </Card>
            </div>
        </Shell>
    );
}
