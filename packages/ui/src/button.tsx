import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, variant = "primary", className, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${variant === "primary"
                        ? "bg-brand-600 text-white hover:bg-brand-700"
                        : "bg-brand-100 text-brand-900 hover:bg-brand-200"
                    } ${className}`}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";
