import * as React from "react";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={`border bg-background ${className}`}>{children}</div>;
}

export function CardContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}
