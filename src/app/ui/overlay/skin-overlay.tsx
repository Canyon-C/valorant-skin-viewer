"use client";
import React, { useEffect, useState } from "react";
import { useOverlay } from "@/app/utils/grid";
import { ApiDataInstance, Render } from "@/app/utils/skin-api-class";
import Image from "next/image";

// --- Component Definitions ---

const LevelButton = ({ onClick, isActive, children }: { onClick: () => void; isActive: boolean; children: React.ReactNode }) => {
  const [isHovered, setIsHovered] = useState(false);
  const showActiveEffects = isHovered || isActive;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`filter-button hover:cursor-pointer transition-all duration-200 text-white relative overflow-hidden 
        w-10 h-10 flex items-center justify-center
        ${isActive ? 'filter-button-active' : ''} ${showActiveEffects ? 'animate-active-state' : ''}`}
    >
      <div className={`filter-button-line filter-button-line-large ${showActiveEffects ? 'filter-button-line-active' : ''}`}></div>
      <div className={`filter-button-bg ${showActiveEffects ? 'filter-button-bg-active' : ''}`}></div>
      <p className={`text-lg font-medium relative z-10`}>{children}</p>
    </div>
  );
};

const ChromaButton = ({ onClick, isActive, isDisabled, swatch }: { onClick: () => void; isActive: boolean; isDisabled: boolean; swatch: JSX.Element }) => {
  const clonedSwatch = React.cloneElement(swatch, {
    className: `w-full h-full object-contain relative z-10`
  });

  return (
    <div
      onClick={!isDisabled ? onClick : undefined}
      className={`relative w-10 h-10 rounded-md overflow-hidden transition-colors duration-200 border-2
        ${isDisabled 
          ? 'cursor-not-allowed opacity-50 border-gridDivider' 
          : `cursor-pointer hover:border-floodRed ${isActive ? 'border-floodRed' : 'border-gridDivider'}`
        }
      `}
    >
      {clonedSwatch}
    </div>
  );
};

// --- Main Overlay Component ---

export const SkinOverlay = () => {
  const { isOpen, skinUuid, closeOverlay } = useOverlay();
  const [skinData, setSkinData] = useState<Render | null>(null);
  const [currentChroma, setCurrentChroma] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [videoKey, setVideoKey] = useState(0); // Force video re-render
  const [maxLevel, setMaxLevel] = useState(0);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeOverlay();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeOverlay]);

  useEffect(() => {
    // Immediately clear skin data and hide content to prepare for animation.
    setSkinData(null);
    setIsContentVisible(false);

    if (!skinUuid || !isOpen) {
      return;
    }

    const fetchSkinData = async () => {
      try {
        const dataInstance = new ApiDataInstance(skinUuid);
        await dataInstance.initialize();
        setSkinData(dataInstance.data);
        
        // Calculate max level and set as default
        const availableLevels = dataInstance.data.data.levelVideos.filter(v => v !== null);
        const highestLevel = availableLevels.length - 1;
        setMaxLevel(highestLevel);
        setCurrentLevel(highestLevel); // Set highest level as default
        setCurrentChroma(0);
        setVideoKey(0);

        // Allow a moment for the content to be ready before fading in
        setTimeout(() => setIsContentVisible(true), 50);
      } catch (error) {
        console.error("Failed to fetch skin data:", error);
      }
    };

    fetchSkinData();
  }, [skinUuid, isOpen]);

  // Update video key when chroma or level changes to force re-render
  useEffect(() => {
    setVideoKey(prev => prev + 1);
  }, [currentChroma, currentLevel]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeOverlay();
    }
  };

  const handleChromaChange = (index: number) => {
    // Only allow non-default chromas if we're at the highest level
    if (index === 0 || currentLevel === maxLevel) {
      setCurrentChroma(index);
    }
  };

  const handleLevelChange = (index: number) => {
    setCurrentLevel(index);
    // Reset to default chroma if not at highest level
    if (index !== maxLevel && currentChroma !== 0) {
      setCurrentChroma(0);
    }
  };

  if (!isOpen) return null;

  // Determine which video to show
  const getVideoSource = () => {
    if (!skinData) return null;
    
    const isHighestLevel = currentLevel === maxLevel;
    const hasChromaVideo = skinData.data.chromaVideos[currentChroma];
    
    if (isHighestLevel && hasChromaVideo) {
      return skinData.data.chromaVideos[currentChroma];
    } else if (skinData.data.levelVideos[currentLevel]) {
      return skinData.data.levelVideos[currentLevel];
    }
    
    return null;
  };

  // Helper functions to determine if selectors should be shown
  const shouldShowChromaSelector = () => {
    if (!skinData) return false;
    // Show if there are multiple chromas available
    return skinData.data.chromaRenders.length > 1;
  };

  const shouldShowLevelSelector = () => {
    if (!skinData) return false;
    // Show if there are multiple levels available
    return maxLevel > 0;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-2 sm:p-4"
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-black border-2 border-gridDivider max-w-full sm:max-w-[85vw] w-full max-h-full sm:max-h-[95vh] overflow-hidden flex flex-col transition-opacity duration-300 ${isContentVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {skinData ? (
          <div className="p-3 flex-1 flex flex-col">
            {/* Main content area */}
            <div className="flex flex-col items-center lg:flex-row lg:items-stretch flex-1">
              {/* Left side - Current chroma render and controls */}
              <div className="flex-none w-full lg:w-1/3 flex flex-col items-center">
                {/* Title moved above the image container */}
                <h2 className="text-white text-2xl lg:text-3xl font-bold text-center min-h-[64px] lg:min-h-[88px] flex items-center justify-center">
                  {skinData.data.displayName}
                </h2>
                
                {/* Skin render wrapper - this div will grow and center its content */}
                <div className="flex-1 flex flex-col items-center justify-center">
                  <Image
                    src={skinData.data.chromaRenders[currentChroma]}
                    alt={skinData.data.displayName}
                    width={1000}
                    height={1000}
                    className="object-contain max-w-xs sm:max-w-sm md:max-w-md"
                  />
                </div>
                
                {/* Controls underneath skin render */}
                <div className="flex flex-col gap-4 items-center justify-center py-2 min-h-[80px] lg:min-h-[112px]">
                  {/* Level selector - only show if multiple levels available */}
                  {shouldShowLevelSelector() && (
                    <div className="flex gap-2">
                      {skinData.data.levelVideos.map((video, index) => {
                        if (video !== null) {
                          return (
                            <LevelButton
                              key={index}
                              onClick={() => handleLevelChange(index)}
                              isActive={currentLevel === index}
                            >
                              {index + 1}
                            </LevelButton>
                          );
                        }
                        return null;
                      })}
                    </div>
                  )}

                  {/* Chroma selector - only show if multiple chromas available */}
                  {shouldShowChromaSelector() && (
                    <div className="flex gap-2">
                      {skinData.renderChromaSwatches().map((swatch, index) => {
                        const isDisabled = index !== 0 && currentLevel !== maxLevel;
                        return (
                          <ChromaButton
                            key={index}
                            onClick={() => handleChromaChange(index)}
                            isActive={currentChroma === index}
                            isDisabled={isDisabled}
                            swatch={swatch}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Right side - Video taking full space */}
              <div className="flex-1 lg:flex-[2] flex items-center justify-center pl-0 lg:pl-4">
                {/* Aspect ratio container for video player */}
                {getVideoSource() ? (
                  <div className="w-full aspect-video bg-black overflow-hidden">
                    <video
                      key={videoKey} // Force re-render when video changes
                      className="w-full h-full object-contain" // Video fills container, content is contained
                      controls
                      autoPlay
                      ref={(el) => {
                        if (el) {
                          el.volume = 0.15;
                        }
                      }}
                    >
                      <source src={getVideoSource()!} type="video/mp4" />
                    </video>
                  </div>
                ) : (
                  // Placeholder with same sizing as video container
                  <div className="w-full aspect-video bg-[#222222] overflow-hidden flex items-center justify-center">
                    <p className="text-white text-lg px-4">No video available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3 flex-1 flex flex-col">
            {/* Skeleton Layout */}
            <div className="flex flex-col items-center lg:flex-row lg:items-stretch flex-1">
              <div className="flex-none w-full lg:w-1/3 flex flex-col items-center">
                <div className="min-h-[64px] lg:min-h-[88px]" />
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square" />
                </div>
                <div className="min-h-[80px] lg:min-h-[112px]" />
              </div>
              <div className="flex-1 lg:flex-[2] flex items-center justify-center pl-0 lg:pl-4">
                <div className="w-full aspect-video bg-black rounded-lg overflow-hidden" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};