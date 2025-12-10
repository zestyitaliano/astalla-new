import { Button } from "@astalla/ui";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
    title: string;
    subtitle?: string;
    image?: string | null;
    ctaText?: string;
    ctaLink?: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
}

export function HeroSection({
    title,
    subtitle,
    image,
    ctaText = "Explore Availability",
    ctaLink = "/amenities",
    secondaryCtaText,
    secondaryCtaLink
}: HeroSectionProps) {
    return (
        <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                {image ? (
                    <>
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-in-out hover:scale-105"
                            style={{ backgroundImage: `url(${image})` }}
                        />
                        <div className="absolute inset-0 bg-black/30 md:bg-black/20" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </>
                ) : (
                    <div className="absolute inset-0 bg-zinc-900" />
                )}
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center text-white space-y-8 animate-fade-in-up">
                <div className="space-y-4 max-w-4xl mx-auto">
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1]">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="font-sans text-lg md:text-xl text-zinc-100 max-w-2xl mx-auto font-light tracking-wide opacity-90">
                            {subtitle}
                        </p>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                    {ctaLink && (
                        <Link href={ctaLink}>
                            <Button className="h-14 px-8 text-base bg-white text-zinc-900 hover:bg-zinc-100 rounded-none min-w-[200px] tracking-wide uppercase text-sm font-semibold transition-transform hover:-translate-y-1">
                                {ctaText}
                            </Button>
                        </Link>
                    )}
                    {secondaryCtaLink && secondaryCtaText && (
                        <Link href={secondaryCtaLink}>
                            <Button className="h-14 px-8 text-base bg-transparent border border-white text-white hover:bg-white/10 rounded-none min-w-[200px] tracking-wide uppercase text-sm font-semibold backdrop-blur-sm transition-transform hover:-translate-y-1">
                                {secondaryCtaText}
                            </Button>
                        </Link>
                    )}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white animate-bounce">
                <ArrowRight className="w-6 h-6 rotate-90 opacity-70" />
            </div>
        </section>
    );
}
