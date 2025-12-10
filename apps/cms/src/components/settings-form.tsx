"use client";

import { useState, useEffect } from "react";
import { SiteSettings } from "@astalla/types";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { COLLECTIONS, DOC_IDS } from "@astalla/types";
import { Button, Card, Input } from "@astalla/ui";
import { toast } from "react-hot-toast";

export function SettingsForm() {
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function fetchSettings() {
            try {
                const docRef = doc(db, COLLECTIONS.SITE_SETTINGS, DOC_IDS.SITE_SETTINGS);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setSettings(docSnap.data() as SiteSettings);
                }
            } catch (error) {
                console.error("Error fetching settings:", error);
                toast.error("Failed to load settings.");
            } finally {
                setLoading(false);
            }
        }
        fetchSettings();
    }, []);

    const handleChange = (field: string, value: string) => {
        if (!settings) return;
        setSettings({ ...settings, [field]: value });
    };

    const handleColorChange = (key: keyof SiteSettings['brandColors'], value: string) => {
        if (!settings) return;
        setSettings({
            ...settings,
            brandColors: { ...settings.brandColors, [key]: value }
        });
    };

    const handleSave = async () => {
        if (!settings) return;
        setSaving(true);
        try {
            const docRef = doc(db, COLLECTIONS.SITE_SETTINGS, DOC_IDS.SITE_SETTINGS);
            await updateDoc(docRef, { ...settings, updatedAt: Date.now() });
            toast.success("Settings saved!");
        } catch (error) {
            console.error("Error saving settings:", error);
            toast.error("Failed to save settings.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading settings...</div>;
    if (!settings) return <div>Settings not found.</div>;

    return (
        <div className="space-y-6">
            <Card title="General Information">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Site Name</label>
                        <Input
                            value={settings.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Logo URL</label>
                        <Input
                            value={settings.logoUrl}
                            onChange={(e) => handleChange("logoUrl", e.target.value)}
                        />
                    </div>
                </div>
            </Card>

            <Card title="Brand Colors">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(settings.brandColors).map(([key, value]) => (
                        <div key={key}>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1 capitalize">{key}</label>
                            <div className="flex gap-2">
                                <div
                                    className="w-10 h-10 rounded border border-zinc-200"
                                    style={{ backgroundColor: value }}
                                />
                                <Input
                                    value={value}
                                    onChange={(e) => handleColorChange(key as any, e.target.value)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <div className="flex justify-end">
                <Button onClick={handleSave} disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </div>
    );
}
