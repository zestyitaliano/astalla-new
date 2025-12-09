"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SCHEMA } from "@/config/schema";
import { CollectionForm } from "@/components/collection-form";
import { Shell, Card } from "@astalla/ui";
import { COLLECTIONS } from "@astalla/types";

export default function CollectionEditPage({ params }: { params: Promise<{ collection: string; id: string }> }) {
    const { collection: collectionParam, id } = use(params);
    const router = useRouter();
    const [initialData, setInitialData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isNew = id === 'new';
    const definition = SCHEMA[collectionParam];

    useEffect(() => {
        if (!definition || isNew) {
            setLoading(false);
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
    }, [collectionParam, id, isNew, definition]);

    const handleSubmit = async (data: any) => {
        setIsSubmitting(true);
        try {
            const payload = {
                ...data,
                updatedAt: Date.now(), // Store as number for now specific to simple usage
            };

            if (isNew) {
                payload.createdAt = Date.now();
                await addDoc(collection(db, collectionParam), payload);
            } else {
                // Remove id from payload if it exists in data to avoid overwriting doc ID field inside doc
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

    if (!definition) {
        return (
            <Shell>
                <div className="p-4">Collection not found</div>
            </Shell>
        );
    }

    return (
        <Shell
            header={
                <div className="flex items-center justify-between w-full">
                    <h1 className="text-xl font-bold">{isNew ? `New ${definition.label}` : `Edit ${definition.label}`}</h1>
                </div>
            }
            sidebar={
                <nav className="space-y-1">
                    {Object.entries(COLLECTIONS).map(([key, value]) => (
                        <a
                            key={key}
                            href={`/dashboard/${value}`}
                            className={`block px-3 py-2 text-sm font-medium rounded-md ${value === collectionParam
                                    ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                }`}
                        >
                            {key.replace("_", " ")}
                        </a>
                    ))}
                </nav>
            }
        >
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
