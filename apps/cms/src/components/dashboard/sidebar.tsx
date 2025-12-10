import { COLLECTIONS } from "@astalla/types";
import { LucideIcon, LayoutGrid, FileText, Image, MapPin, Phone } from "lucide-react";

interface DashboardSidebarProps {
    activeCollection?: string;
}

const ICONS: Record<string, LucideIcon> = {
    [COLLECTIONS.SITE_SETTINGS]: LayoutGrid,
    [COLLECTIONS.PAGES]: FileText,
    [COLLECTIONS.AMENITIES]: Image, // Using Image for Amenity as placeholder
    [COLLECTIONS.GALLERY]: Image,
    [COLLECTIONS.NEIGHBORHOOD]: MapPin,
    [COLLECTIONS.CONTACT]: Phone,
};

export function DashboardSidebar({ activeCollection }: DashboardSidebarProps) {
    return (
        <nav className="space-y-1">
            <div className="px-3 mb-6 mt-2">
                <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-100 font-display">
                    <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center text-white text-sm shadow-soft-md shadow-brand-600/30">
                        <span className="font-bold">A</span>
                    </div>
                    Astalla
                </div>
            </div>

            <div className="px-3 mb-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Content</div>

            {Object.entries(COLLECTIONS).map(([key, value]) => {
                const Icon = ICONS[value] || FileText;
                const isActive = activeCollection === value;

                return (
                    <a
                        key={key}
                        href={`/dashboard/${value}`}
                        className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${isActive
                                ? "bg-brand-50 text-brand-900 dark:bg-brand-900/20 dark:text-brand-100"
                                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 hover:translate-x-0.5"
                            }`}
                    >
                        <Icon
                            className={`w-5 h-5 mr-3 transition-colors ${isActive ? "text-brand-600 dark:text-brand-400" : "text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
                                }`}
                        />
                        {key.replace("_", " ")}
                    </a>
                );
            })}

            <div className="px-3 mt-8 mb-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">System</div>
            <a
                href="#"
                className="group flex items-center px-3 py-2 text-sm font-medium rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-200"
            >
                <div className="w-5 h-5 mr-3 border-2 border-zinc-300 dark:border-zinc-700 rounded-full group-hover:border-zinc-500" />
                Settings
            </a>
        </nav>
    );
}
