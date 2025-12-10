import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-zinc-900 text-white py-20 border-t border-zinc-800">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <Link href="/" className="inline-block">
                            <span className="font-serif text-2xl font-bold tracking-widest uppercase">Astalla</span>
                        </Link>
                        <p className="text-zinc-400 font-sans font-light leading-relaxed max-w-xs">
                            Experience the pinnacle of modern living with curated amenities and exceptional design.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-zinc-500">Explore</h4>
                        <ul className="space-y-3 font-light text-zinc-300">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/amenities" className="hover:text-white transition-colors">Amenities</Link></li>
                            <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
                            <li><Link href="/neighborhood" className="hover:text-white transition-colors">Neighborhood</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-zinc-500">Contact</h4>
                        <ul className="space-y-3 font-light text-zinc-300">
                            <li>123 Luxury Lane</li>
                            <li>Knoxville, TN 37902</li>
                            <li>(555) 123-4567</li>
                            <li>leasing@astalla.com</li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-zinc-500">Resident</h4>
                        <ul className="space-y-3 font-light text-zinc-300">
                            <li><Link href="/portal" className="hover:text-white transition-colors">Resident Portal</Link></li>
                            <li><Link href="/maintenance" className="hover:text-white transition-colors">Maintenance</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 uppercase tracking-wider">
                    <p>© {new Date().getFullYear()} Astalla. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-values">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-values">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
