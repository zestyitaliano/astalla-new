import Image from "next/image";
import { Button } from "@astalla/ui";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SplitFeatureProps {
    title: string;
    description: string;
    image: string;
    imageAlt?: string;
    reversed?: boolean;
    ctaText?: string;
    ctaLink?: string;
}

export function SplitFeature({
    title,
    description,
    image,
    imageAlt = "Feature image",
    reversed = false,
    ctaText,
    ctaLink
}: SplitFeatureProps) {
    return (
        <section className="py-24 bg-[#F7F5F2] overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6">
                <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${reversed ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Image Side */}
                    <div className="w-full lg:w-1/2 relative aspect-[4/5] lg:aspect-square max-h-[700px]">
                        <div className="absolute inset-0 bg-brand-200 transition-transform duration-700 translate-x-4 translate-y-4" />
                        <img
                            src={image}
                            alt={imageAlt}
                            className="absolute inset-0 w-full h-full object-cover shadow-xl transition-transform duration-700 hover:scale-[1.01]"
                        />
                    </div>

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        <div className="space-y-4">
                            <h2 className="font-serif text-4xl lg:text-5xl text-zinc-900 leading-tight">
                                {title}
                            </h2>
                            <div className="w-16 h-1 bg-brand-600/30" />
                            <p className="font-sans text-lg text-zinc-600 leading-relaxed font-light">
                                {description}
                            </p>
                        </div>

                        {ctaLink && (
                            <Link href={ctaLink} className="inline-flex items-center group text-brand-900 font-medium tracking-wide uppercase text-sm hover:text-brand-600 transition-colors">
                                {ctaText || "Learn More"}
                                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
