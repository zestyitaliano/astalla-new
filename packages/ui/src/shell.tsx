import * as React from "react";

export interface ShellProps {
    children: React.ReactNode;
    sidebar?: React.ReactNode;
    header?: React.ReactNode;
}

export function Shell({ children, sidebar, header }: ShellProps) {
    return (
        <div className="flex min-h-screen bg-[#F7F8FA] dark:bg-zinc-950 transition-colors duration-200">
            {/* Sidebar */}
            {sidebar && (
                <aside className="w-64 flex-shrink-0 bg-white dark:bg-zinc-900 border-r border-zinc-100 dark:border-zinc-800 hidden md:block z-20">
                    <div className="h-full px-4 py-6">{sidebar}</div>
                </aside>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {header && (
                    <header className="h-16 flex-shrink-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800 px-8 flex items-center justify-between sticky top-0 z-10 transition-all">
                        {header}
                    </header>
                )}
                <main className="flex-1 p-8 overflow-auto">{children}</main>
            </div>
        </div>
    );
}
