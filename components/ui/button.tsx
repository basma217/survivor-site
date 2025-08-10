// components/ui/button.tsx
import * as React from "react";

type CommonProps = {
  variant?: "default" | "outline";
  className?: string;
  children?: React.ReactNode;
  asChild?: boolean;
};

type ButtonElProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorElProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonProps = CommonProps & (ButtonElProps | AnchorElProps);

export function Button({
  variant = "default",
  className = "",
  children,
  asChild = false,
  ...props
}: ButtonProps) {
  const base =
    "px-4 py-2 rounded-md text-sm font-medium transition-colors inline-flex items-center justify-center gap-2";
  const styles =
    variant === "outline"
      ? "border border-primary text-primary bg-transparent hover:bg-primary/10 hover:text-primary-hover hover:border-primary-hover"
      : "bg-primary text-primary-foreground hover:bg-primary-hover";

  if (asChild) {
    const anchorProps = props as AnchorElProps;
    return (
      <a {...anchorProps} className={`${base} ${styles} ${className}`}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonElProps;
  return (
    <button {...buttonProps} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}
