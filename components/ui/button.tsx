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
      ? "border border-gray-300 bg-transparent hover:bg-gray-100"
      : "bg-primary text-white hover:bg-primary/90";

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
