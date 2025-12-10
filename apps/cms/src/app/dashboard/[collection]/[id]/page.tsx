"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SCHEMA } from "@/config/schema";
import { CollectionForm } from "@/components/collection-form";
import { Shell, Card } from "@astalla/ui";
import { COLLECTIONS } from "@astalla/types";
import { useAuth } from "@/context/auth-context";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

export default function CollectionEditPage({ params }: { params: { collection: string; id: string } }) {
    const { collection: collectionParam, id } = params;
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [initialData, setInitialData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isNew = id === 'new';
    const definition = SCHEMA[collectionParam];

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login");
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (!definition || isNew || !user) {
            if (isNew) setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const docRef = doc(db, collectionParam, id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setInitialData({ id: docSnap.id, ...docSnap.data() });
                }
            } catch (error) {
                console.error("Error fetching document:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [collectionParam, id, isNew, definition, user]);

    const handleSubmit = async (data: any) => {
        if (!user) return;
        setIsSubmitting(true);
        try {
            const payload = {
                ...data,
                updatedAt: Date.now(),
            };

            if (isNew) {
                payload.createdAt = Date.now();
                await addDoc(collection(db, collectionParam), payload);
            } else {
                const { id: _, ...updateData } = payload;
                await setDoc(doc(db, collectionParam, id), updateData, { merge: true });
            }
            router.push(`/dashboard/${collectionParam}`);
        } catch (error) {
            console.error("Error saving document: ", error);
            alert("Failed to save item.");
        } finally {
            setIsSubmitting(false);
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
        return null;
    }

    if (!definition) {
        return (
            <Shell>
                <div className="p-4">Collection not found</div>
            </Shell>
        );
    }

    import { DashboardSidebar } from "@/components/dashboard/sidebar";
    import { DashboardHeader } from "@/components/dashboard/header";

    // ...

    return (
        <Shell
            header={<DashboardHeader />}
            sidebar={<DashboardSidebar activeCollection={collectionParam} />}
        >
            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{isNew ? `New ${definition.label}` : `Edit ${definition.label}`}</h1>
            </div>
            <Card>
                {loading ? (
                    <div className="p-4 text-center">Loading...</div>
                ) : (
                    <CollectionForm
                        schema={definition}
                        initialData={initialData}
                        onSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                    />
                )}
            </Card>
        </Shell>
    );
}
