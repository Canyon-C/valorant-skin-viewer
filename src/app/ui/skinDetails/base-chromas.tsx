import { useEffect, useState } from "react";
import { useDataContext } from "./dataContext";

export const BaseChroma = () => {
  const dataInstnace = useDataContext();
  const [baseChroma, setBaseChroma] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (dataInstnace && dataInstnace.data) {
      setBaseChroma(dataInstnace.data.renderBaseChroma());
    }
  }, [dataInstnace]);

  return baseChroma;
};
