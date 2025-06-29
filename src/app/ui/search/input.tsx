"use client";
import * as React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { cn } from "@/lib/utils";

// --- Search Input Component ---
// A controlled input component with debounced search functionality
// that updates the URL search parameters.

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    // --- State Management ---
    // Controlled component state for the input value.
    const [searchValue, setSearchValue] = React.useState(
      searchParams.get("query") || ""
    );

    // --- Effects ---
    // Effect to sync input value from URL search parameters.
    // This is useful when navigating from a bundle page, which sets the search query.
    React.useEffect(() => {
      setSearchValue(searchParams.get("query") || "");
    }, [searchParams]);

    // Debounced function to update the URL with the search query.
    const handleSearch = useDebouncedCallback((search: string) => {
      // Create a new URLSearchParams instance from the current searchParams string.
      // This ensures that modifications are based on the most up-to-date URL state
      // each time the debounced function executes.
      const newParams = new URLSearchParams(searchParams.toString());

      // Trim the search string and check if it's empty
      const trimmedSearch = search.trim();

      if (trimmedSearch) {
        newParams.set("query", trimmedSearch);
      } else {
        newParams.delete("query");
      }
      replace(`${pathname}?${newParams.toString()}`);
    }, 300);

    // Effect to handle search updates from other components via a custom event.
    React.useEffect(() => {
      const handleUpdateSearch = (event: CustomEvent) => {
        const query = event.detail.query;
        setSearchValue(query);
        handleSearch(query);
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

    // --- Placeholder Logic ---
    // Determines the placeholder text based on the current view mode.
    const getPlaceholder = () => {
      const currentView = searchParams.get("view") || "skins";
      return currentView === "bundles"
        ? "Search bundles..."
        : "Search skins...";
    };

    // --- Event Handlers ---
    // Handler for input changes to update state and trigger debounced search.
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValue(value);
      handleSearch(value);
    };

    return (
      <div className="w-full flex items-center gap-2">
        <input
          ref={ref} // Forward ref to the input element
          type={type}
          value={searchValue}
          onChange={handleInputChange}
          placeholder={getPlaceholder()}
          className={cn(
            "flex-grow h-10 text-white rounded-md border border-input bg-black px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
