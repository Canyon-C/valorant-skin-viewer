import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"] });
export const Header = () => {
  return (
    <header
      className={`text-white w-5/6 sm:w-full text-xl text-center border-b-2 borderAccent py-3 ${poppins.className}`}
    >
      Features
    </header>
  );
};
