// "use client";
// import { useEffect, useState, useContext, createContext } from "react";
// import { RenderAllBundles } from "@/app/utils/bundle-api-class";
// import { FetchData } from "@/app/utils/bundle-api-class";

// const BundleDataContext = createContext<RenderAllBundles>(
//   {} as RenderAllBundles
// );

// export const ApiDataProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [apiInstance, setApiInstance] = useState<RenderAllBundles>(
//     {} as RenderAllBundles
//   );

//   useEffect(() => {
//     const init = async () => {
//       const dataClassInstance = new FetchData();
//       setApiInstance(await dataClassInstance.getData());
//     };
//     init();
//   }, []);

//   return (
//     <BundleDataContext.Provider value={apiInstance}>
//       {children}
//     </BundleDataContext.Provider>
//   );
// };

// export const useBundleDataContext = () => {
//   const context = useContext(BundleDataContext);
//   return context;
// };
