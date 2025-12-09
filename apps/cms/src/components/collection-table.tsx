import * as React from "react";
import { CollectionDefinition } from "@/config/schema";
import { Button } from "@astalla/ui";

interface CollectionTableProps {
    data: any[];
    schema: CollectionDefinition;
    onEdit: (item: any) => void;
    onDelete: (item: any) => void;
}

export function CollectionTable({ data, schema, onEdit, onDelete }: CollectionTableProps) {
    return (
        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
                <thead className="bg-zinc-50 dark:bg-zinc-900">
                    <tr>
                        {schema.fields.map((field) => (
                            <th
                                key={field.name}
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                            >
                                {field.label}
                            </th>
                        ))}
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-950">
                    {data.map((item) => (
                        <tr key={item.id}>
                            {schema.fields.map((field) => (
                                <td
                                    key={field.name}
                                    className="whitespace-nowrap px-6 py-4 text-sm text-zinc-900 dark:text-zinc-100"
                                >
                                    <div className="max-w-xs overflow-hidden text-ellipsis">
                                        {item[field.name]}
                                    </div>
                                </td>
                            ))}
                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                <div className="flex justify-end gap-2">
                                    <Button onClick={() => onEdit(item)}>Edit</Button>
                                    <button
                                        onClick={() => onDelete(item)}
                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
