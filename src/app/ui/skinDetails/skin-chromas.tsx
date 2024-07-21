"use client";
import { useEffect, useState } from "react";
import { useDataContext } from "./dataContext";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export const SkinChromas = () => {
  const dataInstance = useDataContext();
  const [chromas, setChromas] = useState<JSX.Element[] | null>(null);
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [currentLevel, setCurrentLevel] = useState<number | null>(null);
  const [levelLength, setLevelLength] = useState<number>(0);

  useEffect(() => {
    if (dataInstance && dataInstance.data) {
      setChromas(dataInstance.data.renderSkinChromas());
      setLevelLength(dataInstance.data.levelLength().length);
    }
  }, [dataInstance]);

  useEffect(() => {
    const level = params.get("level");
    if (level !== null) {
      setCurrentLevel(parseInt(level));
    } else {
      setCurrentLevel(null);
    }
  }, [params.getAll("level").values()]);

  const handleClick = (chromaIndex: number) => {
    if (params.has("chroma")) {
      params.delete("chroma");
      params.append("chroma", chromaIndex.toString());
    } else {
      params.append("chroma", chromaIndex.toString());
    }

    replace(`${pathname}?${params.toString()}`);
  };

  if (!chromas) return null;

  if (currentLevel === levelLength - 1) {
    return chromas.map((chroma, index) => {
      return (
        <div
          key={index}
          className="chromaContainer flex flex-col hover:cursor-pointer"
          onClick={() => handleClick(index)}
        >
          {chroma}
        </div>
      );
    });
  } else {
    console.log(levelLength);
    return (
      <div
        className="chromaContainer flex flex-col hover:cursor-pointer"
        onClick={() => handleClick(0)}
      >
        {chromas[0]}
      </div>
    );
  }
};
