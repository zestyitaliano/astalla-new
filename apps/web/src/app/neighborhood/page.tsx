import { getNeighborhood } from "@/lib/api";
import { HeroSection } from "@/components/hero-section";
import { SectionHeading } from "@/components/section-heading";
import { SplitFeature } from "@/components/split-feature";

export const revalidate = 60;

export default async function NeighborhoodPage() {
    const neighborhood = await getNeighborhood();

    return (
        <div className="bg-white min-h-screen">
            <HeroSection
                title="The Neighborhood"
                subtitle="Immerse yourself in a vibrant community rich with culture, dining, and entertainment."
                image="https://images.unsplash.com/photo-1549637642-90187f64f420?auto=format&fit=crop&q=80&w=2000"
            />

            <div className="container mx-auto px-6 py-24">
                <SectionHeading
                    title="Local Favorites"
                    subtitle="Explore our curated list of nearby hotspots."
                />

                <div className="space-y-24 mt-16">
                    {neighborhood.map((item, index) => (
                        // Using SplitFeature for a premium list look. Since NeighborhoodLocation doesn't have an image, we'll use a placeholder or conditional rendering. 
                        // For MVP without explicit images in data model for neighborhood, we might just list them or use a generic image.
                        // Let's assume for this luxury implementation we want to show them nicely. I'll use a card grid instead if images aren't guaranteed, 
                        // OR use relevant unsplash images based on category.
                        <div key={item.id} className="flex flex-col md:flex-row gap-8 items-center border-b border-zinc-100 pb-16 last:border-0">
                            <div className={`w-full md:w-1/2 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                                <div className="aspect-video bg-zinc-100 rounded-lg overflow-hidden relative">
                                    <div className="absolute inset-0 flex items-center justify-center bg-brand-50 text-brand-200">
                                        <span className="font-serif text-4xl opacity-20">{item.category}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={`w-full md:w-1/2 space-y-4 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                                <span className="text-xs font-bold tracking-widest uppercase text-brand-600">{item.category}</span>
                                <h3 className="font-serif text-3xl text-zinc-900">{item.name}</h3>
                                <p className="text-zinc-600 font-light leading-relaxed">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {neighborhood.length === 0 && (
                    <p className="text-center text-zinc-400 mt-12 font-light">Neighborhood guide coming soon.</p>
                )}
            </div>
        </div>
    );
}
