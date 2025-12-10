"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
    siteName?: string;
    logoUrl?: string;
}

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Amenities", href: "/amenities" },
    { label: "Gallery", href: "/gallery" },
    { label: "Portal", href: "/portal" },
];

export function Navbar({ siteName = "Astalla", logoUrl }: NavbarProps) {
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
                    {logoUrl && <img src={logoUrl} alt={siteName} className="h-8 w-8 object-contain" />}
                    <span>{siteName}</span>
                </Link>
                <div className="hidden gap-6 md:flex">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-colors hover:text-zinc-900 dark:hover:text-zinc-50 ${pathname === link.href
                                ? "text-zinc-900 dark:text-zinc-50"
                                : "text-zinc-500 dark:text-zinc-400"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
