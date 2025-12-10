"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@astalla/ui";

interface NavbarProps {
    siteName?: string;
    logoUrl?: string;
    navLinks?: { label: string; url: string }[];
}

const DEFAULT_LINKS = [
    { label: "Home", url: "/" },
    { label: "Amenities", url: "/amenities" },
    { label: "Gallery", url: "/gallery" },
    { label: "Neighborhood", url: "/neighborhood" },
    { label: "Contact", url: "/contact" },
];

export function Navbar({ siteName = "Astalla", logoUrl, navLinks = DEFAULT_LINKS }: NavbarProps) {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const isHome = pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isTransparent = isHome && !scrolled;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isTransparent
                ? "bg-transparent text-white border-transparent py-6"
                : "bg-white/95 backdrop-blur-md text-zinc-900 border-zinc-100 py-3 shadow-soft-sm dark:bg-zinc-950/90 dark:text-white dark:border-zinc-800"
                }`}
        >
            <div className="container mx-auto flex items-center justify-between px-6">
                <Link href="/" className="flex items-center gap-3 group">
                    {logoUrl && (
                        <img
                            src={logoUrl}
                            alt={siteName}
                            className={`object-contain transition-all duration-300 ${isTransparent ? "h-10 w-10 brightness-0 invert" : "h-9 w-9"}`}
                        />
                    )}
                    {!logoUrl && (
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${isTransparent ? "border-white" : "border-brand-600"}`}>
                            <span className={`font-serif font-bold ${isTransparent ? "text-white" : "text-brand-600"}`}>A</span>
                        </div>
                    )}
                    <span className={`text-lg font-serif font-bold tracking-wide uppercase transition-colors ${isTransparent ? "text-white" : "text-zinc-900 dark:text-white"}`}>
                        {siteName}
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.url}
                            href={link.url}
                            className={`text-sm font-sans font-medium tracking-wide uppercase transition-all hover:-translate-y-0.5 ${pathname === link.url
                                ? (isTransparent ? "text-white opacity-100 border-b-2 border-white" : "text-brand-600 border-b-2 border-brand-600")
                                : (isTransparent ? "text-white/80 hover:text-white hover:opacity-100" : "text-zinc-500 hover:text-brand-600 dark:text-zinc-400 dark:hover:text-white")
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link href="/contact">
                        <Button
                            className={`rounded-none px-6 uppercase text-xs font-bold tracking-widest transition-all ${isTransparent
                                ? "bg-white text-zinc-900 hover:bg-zinc-100"
                                : "bg-zinc-900 text-white hover:bg-zinc-800"
                                }`}
                        >
                            Book Now
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
