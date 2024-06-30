import { useSearchParams } from "next/navigation";

export const SearchBar = () => {
    const searchParams = new URLSearchParams();
    

    return(
        <div className="searchContainer flex justify-center align-center border-2 border-green-600 w-full py-3">
            <div className="text-white flex border-2 border-red-800 w-fit"></div>
        </div>
        
    );
}