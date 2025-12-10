import * as React from "react";
import { CollectionDefinition } from "@/config/schema";
import { Button, Input } from "@astalla/ui";
import { useRouter } from "next/navigation";
import { ImageUpload } from "./image-upload";
import { RichTextEditor } from "./rich-text-editor";

interface CollectionFormProps {
    initialData?: any;
    schema: CollectionDefinition;
    onSubmit: (data: any) => Promise<void>;
    isSubmitting: boolean;
}

export function CollectionForm({
    initialData,
    schema,
    onSubmit,
    isSubmitting,
}: CollectionFormProps) {
    const [formData, setFormData] = React.useState(initialData || {});
    const router = useRouter();

    const handleChange = (name: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            {schema.fields.map((field) => (
                <div key={field.name}>
                    {field.type === "textarea" ? (
                        <div className="w-full">
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">{field.label}</label>
                            <textarea
                                className="flex w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-white min-h-[100px]"
                                value={formData[field.name] || ""}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                required={field.required}
                            />
                        </div>
                    ) : field.type === "rich-text" ? (
                        <RichTextEditor
                            label={field.label}
                            value={formData[field.name] || ""}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                            required={field.required}
                        />
                    ) : field.type === "image" ? (
                        <div className="w-full">
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">{field.label}</label>
                            <ImageUpload
                                value={formData[field.name] || ""}
                                onChange={(val) => handleChange(field.name, val)}
                                disabled={isSubmitting}
                            />
                        </div>
                    ) : field.type === "select" ? (
                        <div className="w-full">
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">{field.label}</label>
                            <select
                                className="flex h-10 w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-white dark:bg-zinc-900"
                                value={formData[field.name] || ""}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                required={field.required}
                            >
                                <option value="">Select an option</option>
                                {field.options?.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <Input
                            label={field.label}
                            value={formData[field.name] || ""}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                            required={field.required}
                        />
                    )}
                </div>
            ))}
            <div className="flex justify-end gap-4">
                <Button
                    type="button"
                    className="bg-transparent text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    onClick={() => router.back()}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Item"}
                </Button>
            </div>
        </form>
    );
}
