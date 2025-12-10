"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SCHEMA } from "@/config/schema";
import { CollectionTable } from "@/components/collection-table";
import { Shell, Button, Card } from "@astalla/ui";
import { COLLECTIONS } from "@astalla/types";
import { useAuth } from "@/context/auth-context";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

export default function CollectionListPage({ params }: { params: { collection: string } }) {
    const { collection: collectionParam } = params;
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const definition = SCHEMA[collectionParam];

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login");
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (!definition || !user) return;

        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, collectionParam));
                const items = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setData(items);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [collectionParam, definition, user]);

    const handleDelete = async (item: any) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        try {
            await deleteDoc(doc(db, collectionParam, item.id));
            setData(prev => prev.filter(i => i.id !== item.id));
        } catch (error) {
            console.error("Error deleting document: ", error);
            alert("Failed to delete item.");
        }
    };

    if (authLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect
    }

    if (!definition) {
        return (
            <Shell>
                <div className="p-4">Collection not found</div>
            </Shell>
        );
    }

    return (
        <Shell
            header={<DashboardHeader />}
            sidebar={<DashboardSidebar activeCollection={collectionParam} />}
        >
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{definition.label}</h1>
                    <p className="text-sm text-zinc-500">Manage your {definition.label.toLowerCase()} collection</p>
                </div>
                <Button onClick={() => router.push(`/dashboard/${collectionParam}/new`)}>
                    Add New
                </Button>
            </div>
            <Card className="overflow-hidden">
                {loading ? (
                    <div className="p-4 text-center">Loading...</div>
                ) : (
                    <CollectionTable
                        data={data}
                        schema={definition}
                        onEdit={(item) => router.push(`/dashboard/${collectionParam}/${item.id}`)}
                        onDelete={handleDelete}
                    />
                )}
            </Card>
        </Shell>
    );
}
