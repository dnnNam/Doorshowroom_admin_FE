import React from "react";
import { cn } from "../../lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-amber-900/5 shadow-[0_4px_20px_-4px_rgba(217,119,6,0.05)] overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}
export function CardHeader({ className, ...props }: CardProps) {
  return (
    <div
      className={cn("px-6 py-4 border-b border-slate-100", className)}
      {...props}
    />
  );
}
export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-lg font-semibold text-slate-800", className)}
      {...props}
    />
  );
}
export function CardContent({ className, ...props }: CardProps) {
  return <div className={cn("p-6", className)} {...props} />;
}
