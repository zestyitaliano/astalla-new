/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "../../packages/ui/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Astalla Brand Colors (Mapped to CSS Variables)
                brand: {
                    50: 'var(--color-brand-50, #f9f8f6)',
                    100: 'var(--color-brand-100, #f2efe9)',
                    200: 'var(--color-brand-200, #e6e0d4)',
                    300: 'var(--color-brand-300, #d5cbb8)',
                    400: 'var(--color-brand-400, #c2b399)',
                    500: 'var(--color-brand-500, #b09b7d)',
                    600: 'var(--color-brand-600, #9d8666)', // Primary
                    700: 'var(--color-brand-700, #826e52)',
                    800: 'var(--color-brand-800, #6b5a45)',
                    900: 'var(--color-brand-900, #574a3b)',
                },
                primary: 'var(--color-primary, #9d8666)',
                secondary: 'var(--color-secondary, #f2efe9)',
                accent: 'var(--color-accent, #b09b7d)',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                serif: ['var(--font-playfair)', 'serif'],
            },
        },
    },
    plugins: [],
};
