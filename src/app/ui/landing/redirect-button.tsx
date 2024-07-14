import Link from 'next/link';
import { Poppins } from "next/font/google";

const poppins = Poppins({weight: ['400', '700'], subsets: ["latin"]})

export const Redirect = () => {
    return(
        <Link href="./skin">
            <div className="navContainer">
                <button className={`${poppins.className} px-6 py-2 bg-[#ff4655] dark:border-white dark:text-white text-white rounded-lg transform hover:-translate-y-1 transition duration-400`}>Skin Viewer</button>
            </div>
        </Link>
       
    );
}