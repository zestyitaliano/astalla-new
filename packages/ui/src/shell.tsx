import * as React from "react";

export interface ShellProps {
    children: React.ReactNode;
    sidebar?: React.ReactNode;
    header?: React.ReactNode;
}

export function Shell({ children, sidebar, header }: ShellProps) {
    return (
        <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
            {/* Sidebar */}
            {sidebar && (
                <aside className="w-64 flex-shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hidden md:block">
                    <div className="h-full px-4 py-6">{sidebar}</div>
                </aside>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {header && (
                    <header className="h-16 flex-shrink-0 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 backdrop-blur-sm px-6 flex items-center justify-between sticky top-0 z-10">
                        {header}
                    </header>
                )}
                <main className="flex-1 p-6 overflow-auto">{children}</main>
            </div>
        </div>
    );
}
