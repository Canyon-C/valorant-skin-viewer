// "use client";
// import { useBundleDataContext } from "./apiContext";
// import { useState, useEffect } from "react";

// export const GetCurrentBundle = () => {
//   const bundleApiInstance = useBundleDataContext();
//   const [bundleImages, setBundleImages] = useState<JSX.Element[]>([]);

//   useEffect(() => {
//     if (bundleApiInstance) {
//       setBundleImages(bundleApiInstance.renderBundles);
//     }
//   }, [bundleApiInstance]);

//   return <div>{bundleImages}</div>;
// };
