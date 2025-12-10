import Link from "next/link";
import { Search, Bell, ChevronRight } from "lucide-react";

interface DashboardHeaderProps {
    title?: string;
    subtitle?: string;
    breadcrumbs?: { label: string; href?: string; active?: boolean }[];
}

export function DashboardHeader({ title, subtitle, breadcrumbs }: DashboardHeaderProps) {
    return (
        <div className="flex flex-col space-y-4 w-full mb-6">
            <div className="flex items-center justify-between w-full">
                <div className="flex flex-col gap-1">
                    {breadcrumbs && (
                        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-2">
                            {breadcrumbs.map((crumb, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    {i > 0 && <ChevronRight className="w-4 h-4" />}
                                    {crumb.href && !crumb.active ? (
                                        <Link href={crumb.href} className="hover:text-zinc-900 transition-colors">
                                            {crumb.label}
                                        </Link>
                                    ) : (
                                        <span className={crumb.active ? "text-zinc-900 font-medium" : ""}>
                                            {crumb.label}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </nav>
                    )}
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{title || "Overview"}</h1>
                    {subtitle && <p className="text-zinc-500 text-sm">{subtitle}</p>}
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full w-48 border border-transparent focus-within:border-zinc-300 dark:focus-within:border-zinc-600 transition-all mr-4">
                        <Search className="w-4 h-4 text-zinc-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-zinc-500 text-zinc-900 dark:text-zinc-100"
                        />
                    </div>
                    <button className="relative p-2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900"></span>
                    </button>
                    <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 mx-1"></div>
                    <div className="flex items-center gap-3 pl-1">
                        <div className="flex flex-col items-end hidden sm:flex">
                            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Admin User</span>
                            <span className="text-xs text-zinc-500">Property Manager</span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 border-2 border-white dark:border-zinc-800 shadow-sm" />
                    </div>
                </div>
            </div>
        </div>
    );
}
