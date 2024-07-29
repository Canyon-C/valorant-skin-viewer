"use client";
import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const LandingInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [query, setQuery] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      router.push(`/skin?query=${query}`);
    };
    return (
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex justify-center items-center">
          <input
            defaultValue={searchParams.get("query")?.toString()}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type={type}
            ref={ref}
            className={cn(
              "flex h-10 w-[15rem] sm:w-[30rem] text-white rounded-md border border-input bg-black px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            {...props}
          />
        </div>
      </form>
    );
  }
);
LandingInput.displayName = "Input";

export { LandingInput };
