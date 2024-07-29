"use client";
import { useEffect, useState } from "react";
import { useDataContext } from "./dataContext";
import { useSearchParams } from "next/navigation";

export const SkinLevelVideos = () => {
  const dataInstance = useDataContext();
  const [levelVideos, setLevelVideos] = useState<JSX.Element[] | null[]>();
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [levelLength, setLevelLength] = useState<number>(0);
  const [currentChroma, setCurrentChroma] = useState<number>(0);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    const level = params.get("level");
    const chroma = params.get("chroma");
    if (level !== null) {
      setCurrentLevel(parseInt(level));
    }
    if (chroma !== null) {
      setCurrentChroma(parseInt(chroma));
    }
  }, [params.getAll("level").values()]);

  useEffect(() => {
    if (dataInstance && dataInstance.data) {
      setLevelVideos(dataInstance.data.renderLevelVideos());
      setLevelLength(dataInstance.data.levelLength().length);
    }
  }, [dataInstance]);
  if (levelVideos && levelVideos.length === 0) return <p>No Levels</p>;
  if (currentLevel === levelLength - 1 && currentChroma !== 0) {
    return null;
  } else if (levelVideos) {
    return (
      <div className="flex flex-wrap justify-center">
        <div className="w-full p-2">{levelVideos[currentLevel]}</div>
      </div>
    );
  }
};
