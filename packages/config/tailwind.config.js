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
                // Astalla Brand Colors (Warm Neutrals)
                brand: {
                    50: '#f9f8f6',
                    100: '#f2efe9',
                    200: '#e6e0d4',
                    300: '#d5cbb8',
                    400: '#c2b399',
                    500: '#b09b7d',
                    600: '#9d8666',
                    700: '#826e52',
                    800: '#6b5a45',
                    900: '#574a3b',
                },
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                serif: ['var(--font-playfair)', 'serif'],
            },
        },
    },
    plugins: [],
};
