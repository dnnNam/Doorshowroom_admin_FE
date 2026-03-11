import * as React from "react";

import { cn } from "@/lib/utils";
interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode;
}
function Input({ className, type, icon, ...props }: InputProps) {
  return (
    <div className="relative w-full">
      {icon && (
        <span className="absolute left-2 top-1/2 -translate-y-1/2">{icon}</span>
      )}

      <input
        type={type}
        data-slot="input"
        className={cn(
          "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1",
          icon && "pl-8",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
