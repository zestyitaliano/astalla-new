import { getContact } from "@/lib/api";
import { HeroSection } from "@/components/hero-section";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@astalla/ui";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const revalidate = 60;

export default async function ContactPage() {
    const contact = await getContact();

    return (
        <div className="bg-[#F7F5F2] min-h-screen pb-24">
            <HeroSection
                title="Get in Touch"
                subtitle="We're here to answer your questions and welcome you home."
                image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
            />

            <div className="container mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="space-y-8">
                        <SectionHeading
                            title="Visit Us"
                            subtitle="Schedule a tour or stop by our leasing office."
                            centered={false}
                        />

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white rounded-full text-brand-600 shadow-sm">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-serif text-xl mb-1">Address</h3>
                                    <p className="text-zinc-600 font-light">{contact?.address || "123 Luxury Lane, Knoxville, TN 37902"}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white rounded-full text-brand-600 shadow-sm">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-serif text-xl mb-1">Phone</h3>
                                    <p className="text-zinc-600 font-light">{contact?.phone || "(555) 123-4567"}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white rounded-full text-brand-600 shadow-sm">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-serif text-xl mb-1">Email</h3>
                                    <p className="text-zinc-600 font-light">{contact?.email || "leasing@astalla.com"}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white rounded-full text-brand-600 shadow-sm">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-serif text-xl mb-1">Office Hours</h3>
                                    <p className="text-zinc-600 font-light whitespace-pre-line">{contact?.officeHours || "Mon-Fri: 9am - 6pm\nSat: 10am - 5pm\nSun: Closed"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-[500px] w-full bg-zinc-200 rounded-lg overflow-hidden shadow-lg">
                        {/* Placeholder Map - In production, use Google Maps Embed API or similar */}
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-300">
                            <p className="text-zinc-500 font-medium">Map Placeholder</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
