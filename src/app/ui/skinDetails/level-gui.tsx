"use client";
import { useDataContext } from "./dataContext";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export const LevelHud = () => {
  const dataInstance = useDataContext();
  const [UI, setUI] = useState<JSX.Element[]>();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    if (dataInstance && dataInstance.data) {
      setUI(dataInstance.data.levelLength());
    }
  }, [dataInstance]);

  const handleClick = (level: number) => {
    if (params.has("level")) {
      params.delete("level");
      params.append("level", level.toString());
    } else {
      params.append("level", level.toString());
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <ul className="text-white flex md:flex-col items-center justify-around w-full h-full gap-3 py-5 px-5">
      {UI?.map((level, index) => (
        <div
          className="border w-1/2 rounded-full flex justify-center borderAccent hover:cursor-pointer"
          key={index}
          onClick={() => {
            handleClick(index);
          }}
        >
          {level}
        </div>
      ))}
    </ul>
  );
};
