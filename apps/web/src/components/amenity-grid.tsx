import { LucideIcon, Wifi, Coffee, Dumbbell, Car, MapPin, Sun, Shield, Package } from "lucide-react";
import { Amenity } from "@astalla/types";
import { RichText } from "./rich-text";

// Fallback icon map
const ICON_MAP: Record<string, LucideIcon> = {
    "wifi": Wifi,
    "coffee": Coffee,
    "gym": Dumbbell,
    "parking": Car,
    "pool": Sun,
    "security": Shield,
    "package": Package,
    "location": MapPin,
};

interface AmenityGridProps {
    amenities: Amenity[];
}

export function AmenityGrid({ amenities }: AmenityGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {amenities.map((item) => {
                // Determine icon based on title keywords if explicit icon isn't available
                let Icon = Star;
                const lowerTitle = item.title.toLowerCase();
                for (const [key, icon] of Object.entries(ICON_MAP)) {
                    if (lowerTitle.includes(key)) Icon = icon;
                }

                return (
                    <div key={item.id} className="group flex flex-col items-start gap-4">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-white border border-brand-200 flex items-center justify-center text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white group-hover:border-transparent mb-2">
                                {item.image ? (
                                    <img src={item.image} alt="" className="w-6 h-6 object-contain opacity-80" />
                                ) : (
                                    <Icon className="w-5 h-5" />
                                )}
                            </div>
                        </div>
                        <h3 className="font-serif text-xl text-zinc-900">{item.title}</h3>
                        <div className="text-zinc-600 font-sans font-light leading-relaxed text-sm">
                            <RichText content={item.description} className="prose-sm prose-zinc" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

import { Star } from "lucide-react";
