import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, variant = "primary", className, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={`inline-flex items-center justify-center px-4 py-2 rounded-full font-medium transition-all duration-200 active:scale-95 ${variant === "primary"
                    ? "bg-brand-600 text-white shadow-[0_4px_12px_rgba(var(--color-brand-600),0.3)] hover:bg-brand-700 hover:-translate-y-0.5"
                    : "bg-white text-zinc-700 border border-zinc-200 shadow-sm hover:bg-zinc-50 hover:text-zinc-900"
                    } ${className}`}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";
