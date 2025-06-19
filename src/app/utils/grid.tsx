"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";

interface OverlayContextType {
  isOpen: boolean;
  skinUuid: string | null;
  openOverlay: (uuid: string) => void;
  closeOverlay: () => void;
}

const OverlayContext = createContext<OverlayContextType | null>(null);

export const OverlayProvider = ({ children }: { children: ReactNode }) => {
  const [skinUuid, setSkinUuid] = useState<string | null>(null);

  const openOverlay = useCallback((uuid: string) => {
    setSkinUuid(uuid);
  }, []);

  const closeOverlay = useCallback(() => {
    setSkinUuid(null);
  }, []);

  const value = useMemo(
    () => ({
      isOpen: skinUuid !== null,
      skinUuid,
      openOverlay,
      closeOverlay,
    }),
    [skinUuid, openOverlay, closeOverlay]
  );

  return (
    <OverlayContext.Provider value={value}>
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlay = () => {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error("useOverlay must be used within an OverlayProvider");
  }
  return context;
};
