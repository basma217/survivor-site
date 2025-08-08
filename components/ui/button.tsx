import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "default" | "outline";
};

export function Button({
  asChild,
  variant = "default",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "px-4 py-2 rounded-md text-sm font-medium transition-colors";
  const styles =
    variant === "outline"
      ? "border border-gray-300 bg-transparent hover:bg-gray-100"
      : "bg-primary text-white hover:bg-primary/90";

  const Comp: any = asChild ? "span" : "button";
  return (
    <Comp className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </Comp>
  );
}
