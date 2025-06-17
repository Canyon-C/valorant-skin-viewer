"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface OverlayContextType {
  isOpen: boolean;
  skinUuid: string | null;
  openOverlay: (uuid: string) => void;
  closeOverlay: () => void;
}

const OverlayContext = createContext<OverlayContextType | null>(null);

export const OverlayProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [skinUuid, setSkinUuid] = useState<string | null>(null);

  const openOverlay = (uuid: string) => {
    setSkinUuid(uuid);
    setIsOpen(true);
  };

  const closeOverlay = () => {
    setIsOpen(false);
    setSkinUuid(null);
  };

  return (
    <OverlayContext.Provider value={{ isOpen, skinUuid, openOverlay, closeOverlay }}>
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
