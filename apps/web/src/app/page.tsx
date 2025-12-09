import Link from "next/link";
import { Button } from "@astalla/ui";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center bg-zinc-900 px-4 text-center text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
        <div className="relative z-10 max-w-4xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Welcome to Astalla
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-300">
            Experience modern living with our curated amenities and stunning
            neighborhood.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/amenities">
              <Button className="bg-white text-zinc-900 hover:bg-zinc-100">
                View Amenities
              </Button>
            </Link>
            <Link href="/gallery">
              <Button className="bg-transparent border border-white text-white hover:bg-white/10">
                View Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Discover the Difference</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              "Premium Design",
              "Connected Community",
              "Exceptional Service"
            ].map((item) => (
              <div key={item} className="p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700">
                <h3 className="text-xl font-semibold mb-2">{item}</h3>
                <p className="text-zinc-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
