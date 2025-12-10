"use client";

import { TextareaHTMLAttributes } from "react";

interface RichTextEditorProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
}

export function RichTextEditor({ label, className, ...props }: RichTextEditorProps) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    {label} <span className="text-xs text-zinc-400 font-normal ml-1">(Markdown supported)</span>
                </label>
            )}
            <textarea
                className={`flex w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-white min-h-[150px] font-mono ${className}`}
                {...props}
            />
            <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 flex gap-2">
                <span>**bold**</span>
                <span>*italic*</span>
                <span># header</span>
                <span>- list</span>
            </div>
        </div>
    );
}
