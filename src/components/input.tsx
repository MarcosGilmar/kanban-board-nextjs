import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = ComponentProps<"input">;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
    placeholder="Search for features..."
      className={twMerge(
        `bg-navy-900 border-[0.5px] border-navy-500 h-10 
          placeholder-navy-200 pl-3 pr-3 rounded-lg text-sm text-navy-50
          outline-none focus-visible:ring-2 focus-visible:ring-navy-400 
          focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950`,
        className,
      )}
      {...props}
    />
  );
}
