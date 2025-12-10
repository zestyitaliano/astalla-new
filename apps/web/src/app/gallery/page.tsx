import { getGallery } from "@/lib/api";
import { HeroSection } from "@/components/hero-section";
import { SectionHeading } from "@/components/section-heading";

export const revalidate = 60;

export default async function GalleryPage() {
    const gallery = await getGallery();

    return (
        <div className="bg-white min-h-screen pb-24">
            <HeroSection
                title="A Visual Journey"
                subtitle="Explore the spaces that define the Smith & Porter experience."
                image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
                ctaText="Schedule a Visit"
                ctaLink="/contact"
            />

            <div className="container mx-auto px-6 py-24">
                <SectionHeading
                    title="Captured Moments"
                    subtitle="Browse our gallery of interiors, exteriors, and community spaces."
                />

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 mt-16 px-4 md:px-0">
                    {gallery.map((item) => (
                        <div key={item.id} className="relative group break-inside-avoid overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={item.url}
                                alt={item.caption || "Gallery image"}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {item.caption && (
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <p className="text-white font-serif text-lg tracking-wide">{item.caption}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {gallery.length === 0 && (
                    <p className="text-center text-zinc-400 mt-12 font-light">Gallery is being updated.</p>
                )}
            </div>
        </div>
    );
}
