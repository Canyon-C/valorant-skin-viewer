"use client";
import { useEffect, useState, useRef } from "react";
import { useDataContext } from "./dataContext";
import { useSearchParams } from "next/navigation";

export const SkinChromaVideos = () => {
  const dataInstance = useDataContext();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [videos, setVideos] = useState<JSX.Element[] | null>();

  const [levelLength, setLevelLength] = useState<number>(0);
  const [chromaLength, setChromaLength] = useState<number>(0);

  const [currentLevel, setCurrentLevel] = useState<number | null>(0);
  const [currentChroma, setCurrentChroma] = useState<number>(0);

  useEffect(() => {
    if (dataInstance && dataInstance.data) {
      setVideos(dataInstance.data.renderChromaVideos());
      setLevelLength(dataInstance.data.levelLength().length);
      setChromaLength(dataInstance.data.chromaLength());
    }
  }, [dataInstance]);

  useEffect(() => {
    const level = params.get("level");
    const chroma = params.get("chroma");
    if (level !== null) {
      setCurrentLevel(parseInt(level));
    } else {
      setCurrentLevel(null);
    }
    if (chroma !== null) {
      setCurrentChroma(parseInt(chroma));
    }
  }, [params.getAll("level").values()]);
  if (!videos) return null;

  if (
    videos[currentChroma - 1] === undefined ||
    videos[currentChroma - 1] === null
  ) {
    if (currentChroma !== 0) {
      return <p>No Chroma</p>;
    }
  } else {
    if (currentLevel === levelLength - 1) {
      return (
        <div className="flex flex-wrap justify-center">
          <div className="w-full p-2 text-white">
            {videos[currentChroma - 1]}
          </div>
        </div>
      );
    }
  }
};
