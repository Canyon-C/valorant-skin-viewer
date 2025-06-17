"use client";
import { useEffect, useState } from "react";
import { useOverlay } from "@/app/utils/overlay-context";
import { ApiDataInstance, Render } from "@/app/utils/skin-api-class";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export const SkinOverlay = () => {
  const { isOpen, skinUuid, closeOverlay } = useOverlay();
  const [skinData, setSkinData] = useState<Render | null>(null);
  const [currentChroma, setCurrentChroma] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [loading, setLoading] = useState(false);
  const [videoKey, setVideoKey] = useState(0); // Force video re-render
  const [maxLevel, setMaxLevel] = useState(0);

  useEffect(() => {
    const fetchSkinData = async () => {
      if (skinUuid && isOpen) {
        setLoading(true);
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
        } catch (error) {
          console.error("Failed to fetch skin data:", error);
        } finally {
          setLoading(false);
        }
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

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const contentVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  // Determine which video to show
  const getVideoSource = () => {
    if (!skinData) return null;
    
    // Check if we're at the highest level and have chroma videos
    const isHighestLevel = currentLevel === skinData.data.levelVideos.filter(v => v !== null).length - 1;
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
    const availableLevels = skinData.data.levelVideos.filter(v => v !== null);
    return availableLevels.length > 1;
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="bg-black border borderAccent rounded-lg max-w-[80vw] w-full max-h-[95vh] overflow-hidden flex flex-col"
        >

          {loading ? (
            <div className="flex justify-center items-center h-96">
              <p className="text-white">Loading...</p>
            </div>
          ) : skinData ? (
            <div className="p-3 flex-1 flex flex-col">
              {/* Main content area */}
              <div className="flex flex-col items-center lg:flex-row lg:items-stretch flex-1">
                {/* Left side - Current chroma render and controls */}
                <div className="flex-none w-full lg:w-1/3 flex flex-col items-center">
                  {/* Title moved above the image container */}
                  <h2 className="text-white text-xl font-bold mb-3 text-center pt-2">
                    {skinData.data.displayName}
                  </h2>
                  
                  {/* Skin render wrapper - this div will grow and center its content */}
                  <div className="flex-grow flex flex-col items-center justify-center mb-4">
                    <Image
                      src={skinData.data.chromaRenders[currentChroma]}
                      alt={skinData.data.displayName}
                      width={1000}
                      height={1000}
                      className="object-contain"
                    />
                  </div>
                  
                  {/* Controls underneath skin render, now at the bottom of this column */}
                  <div className="flex gap-6 items-center justify-center py-2"> {/* This will be at the bottom */}
                    {/* Chroma selector - only show if multiple chromas available */}
                    {shouldShowChromaSelector() && (
                      <div className="flex gap-2">
                        {skinData.renderChromaSwatches().map((swatch, index) => {
                          const isDisabled = index !== 0 && currentLevel !== maxLevel;
                          return (
                            <div
                              key={index}
                              onClick={() => !isDisabled && handleChromaChange(index)}
                              className={`${
                                isDisabled 
                                  ? 'cursor-not-allowed opacity-50' 
                                  : 'cursor-pointer'
                              } ${
                                currentChroma === index ? 'ring-2 ring-red-500' : ''
                              }`}
                            >
                              {swatch}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Level selector - only show if multiple levels available */}
                    {shouldShowLevelSelector() && (
                      <div className="flex gap-2">
                        {skinData.data.levelVideos.map((video, index) => {
                          if (video !== null) {
                            return (
                              <button
                                key={index}
                                onClick={() => handleLevelChange(index)}
                                className={`px-4 py-2 rounded border ${
                                  currentLevel === index
                                    ? 'bg-red-500 text-white border-red-500'
                                    : 'bg-transparent text-white border-white hover:bg-white hover:text-black'
                                }`}
                              >
                                {index + 1}
                              </button>
                            );
                          }
                          return null;
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right side - Video taking full space */}
                <div className="flex-1 lg:flex-[2] flex items-center justify-center pl-0 lg:pl-4">
                  {/* Aspect ratio container for video player */}
                  <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
                    {getVideoSource() ? (
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
                    ) : (
                      // Placeholder fills container, maintains same aspect ratio
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <p className="text-white">No video available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-96">
              <p className="text-white">Failed to load skin data</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};