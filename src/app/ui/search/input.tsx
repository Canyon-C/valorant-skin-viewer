'use client';
import * as React from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce";
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);

    const handleSearch = useDebouncedCallback((search: string) => {
        
        
        if (search) {
            params.set('query', search);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 0)
    return (
        <div className="w-full flex justify-center align-center">
            <input
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
        type={type}
        className={cn(
          "flex h-10 w-1/2 text-white rounded-md border border-input bg-black px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
        </div>
      
    )
  }
)
Input.displayName = "Input"

export { Input }
