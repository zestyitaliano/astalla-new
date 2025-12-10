import type { Config } from "tailwindcss";
import sharedConfig from "@astalla/config/tailwind.config";

const config: Config = {
    ...sharedConfig,
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
    ],
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
export default config;
