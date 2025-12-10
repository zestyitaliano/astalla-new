import type { Config } from "tailwindcss";
import sharedConfig from "@astalla/config/tailwind.config";

const config: Config = {
    ...sharedConfig,
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)', 'sans-serif'],
                serif: ['var(--font-serif)', 'serif'],
            },
            colors: {
                brand: {
                    50: '#F7F5F2', // Warm white/sand
                    100: '#EBE8E3',
                    200: '#DCD6CE',
                    300: '#BDB3A6',
                    400: '#9E9080',
                    500: '#8C7B68',
                    600: '#756350', // Bronze/Gold tone
                    700: '#5E4F40',
                    800: '#463828',
                    900: '#2E2418',
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
export default config;
