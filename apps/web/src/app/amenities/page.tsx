import { getAmenities } from "@/lib/api";
import { HeroSection } from "@/components/hero-section";
import { AmenityGrid } from "@/components/amenity-grid";
import { SectionHeading } from "@/components/section-heading";

export const revalidate = 60;

export default async function AmenitiesPage() {
    const amenities = await getAmenities();

    return (
        <div className="bg-[#F7F5F2] min-h-screen pb-24">
            <HeroSection
                title="Curated Living"
                subtitle="Amenities designed to enhance your lifestyle, from productivity to relaxation."
                image="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=2000" // Placeholder gym/pool image
                ctaText="Book a Tour"
                ctaLink="/contact"
            />

            <div className="container mx-auto px-6 py-24">
                <SectionHeading
                    title="Everything You Need"
                    subtitle="Our community offers a comprehensive suite of amenities tailored to your needs."
                />

                <div className="mt-16">
                    <AmenityGrid amenities={amenities} />
                </div>

                {amenities.length === 0 && (
                    <p className="text-center text-zinc-500 mt-12 font-sans font-light">
                        Amenities are currently being curated. Check back soon.
                    </p>
                )}
            </div>
        </div>
    );
}
