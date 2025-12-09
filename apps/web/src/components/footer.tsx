export function Footer() {
    return (
        <footer className="border-t border-zinc-200 bg-zinc-50 py-12 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    © {new Date().getFullYear()} Astalla. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
