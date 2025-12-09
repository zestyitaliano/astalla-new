import { getAmenities } from "@/lib/api";
import { Card } from "@astalla/ui";

export const revalidate = 60; // Revalidate every minute

export default async function AmenitiesPage() {
    const amenities = await getAmenities();

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">Amenities</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {amenities.map((item) => (
                    <Card key={item.id} title={item.title}>
                        <p className="text-zinc-600 dark:text-zinc-300">
                            {item.description}
                        </p>
                    </Card>
                ))}
            </div>
            {amenities.length === 0 && (
                <p className="text-center text-zinc-500 mt-12">No amenities found.</p>
            )}
        </div>
    );
}
