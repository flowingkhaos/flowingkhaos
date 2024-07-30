import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "text-slate-400 hover:text-accent hover:opacity-85 rounded shadow-xl border border-neutral my-2 animate-shimmer bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium  transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        destructive:
          "bg-destructive text-btn hover:opacity-85 rounded shadow-xl",
        outline:
          "border border-input border-primary bg-background rounded hover:bg-primary hover:text-primary-foreground shadow-lg",
        secondary:
          "rounded shadow-[0_4px_14px_0_rgb(42,31,255,39%)] hover:shadow-[0_6px_20px_rgba(42,31,255,23%)] hover:bg-[rgba(42,31,255,0.9)] px-8 py-2 bg-[#2a1fff] text-btn font-bold transition duration-200 ease-linear",
        accent:
          "rounded shadow-[0_4px_14px_0_rgb(6,229,205,39%)] hover:shadow-[0_6px_20px_rgba(6,229,205,23%)] hover:bg-[rgba(6,229,205,0.9)] px-8 py-2 bg-[#06e5cd] text-btn font-bold transition duration-200 ease-linear",
        ghost: "hover:bg-primary hover:text-primary-foreground rounded",
        link: "text-base-content underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded px-3",
        lg: "h-9 px-3 md:h-11 md:px-8 rounded",
        xl: "md:w-44 w-40 md:h-14 h-12",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
