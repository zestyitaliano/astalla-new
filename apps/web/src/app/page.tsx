import Link from "next/link";
import { Button } from "@astalla/ui";
import { getHomePage, getSiteSettings } from "@/lib/api";
import { HeroSection } from "@/components/hero-section";
import { SplitFeature } from "@/components/split-feature";
import { SectionHeading } from "@/components/section-heading";
import { ArrowRight } from "lucide-react";

export const revalidate = 60;

export default async function Home() {
  const [homeData, siteSettings] = await Promise.all([
    getHomePage(),
    getSiteSettings()
  ]);

  const heroTitle = homeData?.heroTitle || "Smith & Porter";
  const heroSubtitle = homeData?.heroSubtitle || "Timeless luxury in the heart of Atlanta.";
  const heroImage = homeData?.heroImage || null;
  const highlights = homeData?.highlights || [
    "Resort-style saltwater pool",
    "State-of-the-art fitness center",
    "Sky lounge with city views"
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection
        title={heroTitle}
        subtitle={heroSubtitle}
        image={heroImage}
        ctaText="View Availability"
        ctaLink="/contact"
        secondaryCtaText="Amenities"
        secondaryCtaLink="/amenities"
      />

      {/* Intro Section */}
      <section className="py-24 md:py-32 bg-[#F7F5F2]">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="Defined by Distinction"
            subtitle="Experience a residence that blends historic charm with modern sophistication. Every detail has been curated to elevate your daily life."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {highlights.map((item, index) => (
              <div key={index} className="bg-white p-8 md:p-12 border border-zinc-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                <div className="w-12 h-1 bg-brand-500 mb-6 transition-all group-hover:w-20" />
                <h3 className="font-serif text-2xl text-zinc-900 leading-snug">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Split Feature - Interiors */}
      <SplitFeature
        title="Refined Interiors"
        description="Floor-to-ceiling windows, quartz countertops, and designer finishes. Our residences are designed to be your sanctuary."
        image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000"
        imageAlt="Modern Interior"
        ctaText="View Amenities"
        ctaLink="/amenities"
      />

      {/* Split Feature - Neighborhood (Reversed) */}
      <SplitFeature
        title="The Perfect Location"
        description="Steps away from the city's best dining, shopping, and entertainment. Connect with the vibrant culture of the neighborhood."
        image="https://images.unsplash.com/photo-1549637642-90187f64f420?auto=format&fit=crop&q=80&w=2000"
        imageAlt="Neighborhood"
        reversed={true}
        ctaText="Explore Neighborhood"
        ctaLink="/neighborhood"
      />

      {/* Gallery CTA */}
      <section className="relative py-32 bg-zinc-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center fixed-bg" />
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-6xl mb-8">See for Yourself</h2>
          <Link href="/gallery">
            <Button className="h-14 px-10 bg-white text-zinc-900 hover:bg-zinc-200 rounded-none uppercase tracking-widest text-sm font-bold">
              View Gallery
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
