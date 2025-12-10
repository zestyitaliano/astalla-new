import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getSiteSettings } from "@/lib/api";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Astalla Property",
  description: "Powered by Astalla",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  const themeStyles = settings?.brandColors ? {
    '--color-primary': settings.brandColors.primary,
    '--color-secondary': settings.brandColors.secondary,
    '--color-accent': settings.brandColors.accent,
    '--color-brand-600': settings.brandColors.primary, // Mapping primary to brand-600 as requested
    // We can generate other shades or leave them as defaults/fallbacks
    '--color-brand-500': settings.brandColors.accent, // Example mapping
  } as React.CSSProperties : {};

  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${jakarta.variable} antialiased min-h-screen flex flex-col bg-[#F7F5F2] text-zinc-900 font-sans selection:bg-brand-200 selection:text-brand-900`}
        style={themeStyles}
      >
        <Navbar siteName={settings?.name} logoUrl={settings?.logoUrl} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
