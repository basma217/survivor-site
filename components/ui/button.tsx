import * as React from "react";

export function Button({ asChild, variant = "default", className, children, ...props }: any) {
  const base = "px-4 py-2 rounded-md text-sm font-medium transition-colors";
  const styles = variant === "outline"
    ? "border border-gray-300 bg-transparent hover:bg-gray-100"
    : "bg-primary text-white hover:bg-primary/90";

  const Comp = asChild ? "span" : "button";
  return (
    <Comp className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </Comp>
  );
}
