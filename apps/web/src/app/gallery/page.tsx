import { getGallery } from "@/lib/api";

export const revalidate = 60;

export default async function GalleryPage() {
    const gallery = await getGallery();

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">Gallery</h1>
            <div className="masonry-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.map((item) => (
                    <div key={item.id} className="relative group overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800 break-inside-avoid mb-6">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={item.url}
                            alt={item.caption || "Gallery image"}
                            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {item.caption && (
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="text-sm font-medium">{item.caption}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {gallery.length === 0 && (
                <p className="text-center text-zinc-500 mt-12">No gallery images found.</p>
            )}
        </div>
    );
}
