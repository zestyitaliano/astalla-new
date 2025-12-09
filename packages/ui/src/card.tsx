import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    footer?: React.ReactNode;
}

export function Card({ title, footer, children, className, ...props }: CardProps) {
    return (
        <div
            className={`bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm ${className || ""}`}
            {...props}
        >
            {title && (
                <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
                    <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                        {title}
                    </h3>
                </div>
            )}
            <div className="px-6 py-4">{children}</div>
            {footer && (
                <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-200 dark:border-zinc-800 rounded-b-lg">
                    {footer}
                </div>
            )}
        </div>
    );
}
