"use client";
import * as React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { cn } from "@/lib/utils";
import { ArrowBackSVG } from "./arrow-back";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Use controlled component with state
    const [searchValue, setSearchValue] = React.useState(
      searchParams.get("query") || ""
    );

    // Update local state when URL changes (e.g., when navigating from bundle)
    React.useEffect(() => {
      const queryFromUrl = searchParams.get("query") || "";
      setSearchValue(queryFromUrl);
    }, [searchParams]);

    const paramsForPlaceholder = new URLSearchParams(searchParams);

    // Get current view mode from URL params
    const currentView = paramsForPlaceholder.get("view") || "skins";

    // Set placeholder based on current view
    const getPlaceholder = () => {
      if (currentView === "bundles") {
        return "Search bundles...";
      }
      return "Search skins...";
    };

    const handleSearch = useDebouncedCallback((search: string) => {
      // Create a new URLSearchParams instance from the current searchParams string.
      // This ensures that modifications are based on the most up-to-date URL state
      // each time the debounced function executes.
      const newParams = new URLSearchParams(searchParams.toString());

      // Trim the search string and check if it's empty
      const trimmedSearch = search.trim();

      if (trimmedSearch !== "") {
        newParams.set("query", trimmedSearch);
      } else {
        newParams.delete("query");
      }
      replace(`${pathname}?${newParams.toString()}`);
    }, 300);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValue(value);
      handleSearch(value);
    };

    React.useEffect(() => {
      const handleUpdateSearch = (event: CustomEvent) => {
        const query = event.detail.query;
        if (inputRef.current) {
          inputRef.current.value = query;
          handleSearch(query);
        }
      };

      window.addEventListener(
        "updateSearch",
        handleUpdateSearch as EventListener
      );
      return () => {
        window.removeEventListener(
          "updateSearch",
          handleUpdateSearch as EventListener
        );
      };
    }, [handleSearch]);

    return (
      <div className="w-full flex items-center gap-2">
        {pathname !== "/" && <ArrowBackSVG />}
        <input
          onChange={handleInputChange}
          value={searchValue}
          type={type}
          placeholder={getPlaceholder()}
          className={cn(
            "flex-grow h-10 text-white rounded-md border border-input bg-black px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={inputRef}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
