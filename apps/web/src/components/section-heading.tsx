interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    centered?: boolean;
    dark?: boolean;
}

export function SectionHeading({ title, subtitle, centered = true, dark = false }: SectionHeadingProps) {
    return (
        <div className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''} mb-16 space-y-4`}>
            <h2 className={`font-serif text-3xl md:text-5xl ${dark ? 'text-white' : 'text-zinc-900'}`}>
                {title}
            </h2>
            {subtitle && (
                <p className={`font-sans text-lg font-light ${dark ? 'text-zinc-300' : 'text-zinc-600'} leading-relaxed`}>
                    {subtitle}
                </p>
            )}
            {centered && (
                <div className={`w-12 h-px mx-auto ${dark ? 'bg-white/30' : 'bg-zinc-900/10'} mt-6`} />
            )}
        </div>
    );
}
