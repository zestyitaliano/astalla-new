"use client";

import { useAuth } from "@/context/auth-context";
import { Button } from "@astalla/ui";

export default function LoginPage() {
    const { signInWithGoogle } = useAuth();

    return (
        <div className="flex h-screen items-center justify-center bg-zinc-100 dark:bg-zinc-900">
            <div className="w-full max-w-sm p-8 bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 text-center">
                <h1 className="text-2xl font-bold mb-2">Astalla CMS</h1>
                <p className="text-zinc-500 dark:text-zinc-400 mb-8">Sign in to manage your content</p>
                <Button onClick={signInWithGoogle} className="w-full justify-center">
                    Sign In with Google
                </Button>
            </div>
        </div>
    );
}
