"use client";
import { useEffect } from "react";
import { motion, useAnimate } from "framer-motion";
import { Header } from "./details";
import { BentoGridSecondDemo } from "./bento-grid";
import { Redirect } from "./redirect-button";
import { LandingInput } from "./landing-input";

export const ValorantSVG = () => {
  const [svg1, animate1] = useAnimate();
  const [svg2, animate2] = useAnimate();
  const [appear, animateAppear] = useAnimate();
  const [skinViewerButton, animateSkinViewerButton] = useAnimate();
  const [searchBar, animateSearchBar] = useAnimate();

  useEffect(() => {
    const animate_svg1 = async () => {
      animate1(svg1.current, { pathLength: 1 }, { duration: 1.5 });
    };
    const animate_svg2 = async () => {
      animate2(svg2.current, { pathLength: 1 }, { duration: 1.5 });
    };

    const featuresAppear = async () => {
      animateAppear(appear.current, { opacity: 1, y: "2%" });
      animateSearchBar(searchBar.current, { opacity: 1, y: "2%" });
    };

    const svgAnimate = async () => {
      animate_svg1();
      animate_svg2();
      featuresAppear();
      buttonAnimate();
    };

    const buttonAnimate = async () => {
      animateSkinViewerButton(skinViewerButton.current, {
        opacity: 1,
        y: "2%",
      });
    };
    svgAnimate();
  }, []);

  const svgVariants = {
    initial: { pathLength: 0 },
  };

  const appearVariants = {
    initial: { opacity: 0, y: "-5%" },
  };

  return (
    <>
      <div className="heightmoment flex flex-col justify-between items-end">
        <motion.div
          ref={skinViewerButton}
          variants={appearVariants}
          initial="initial"
        >
          <Redirect />
        </motion.div>
      </div>
      <motion.div ref={searchBar} variants={appearVariants} initial="initial">
        <LandingInput
          placeholder="Search Skins"
          type="search"
          className="mb-10"
        />
      </motion.div>

      <div className="landingContainer flex flex-col justify-start items-center ">
        <motion.div
          style={{ position: "absolute", top: "0%", left: "0%" }}
          className={`SVGContainer w-fit py-3 px-5`}
        >
          <div>
            <svg
              className="responsive-svg w-56 h-24 h-max-w-xs md:max-w-md"
              width="400pt"
              height="r265pt"
              viewBox="225 0 1035 440"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="f000000ff"></g>
              <g id="ff4655ff">
                <motion.path
                  ref={svg1}
                  variants={svgVariants}
                  initial="initial"
                  stroke="#ff4655"
                  strokeWidth="2"
                  fill="none"
                  opacity="1.00"
                  d=" M 245.44 4.65 C 248.61 2.76 250.63 6.58 252.34 8.59 C 362.37 146.24 472.53 283.79 582.55 421.44 C 584.81 423.40 583.10 427.59 580.05 427.14 C 527.37 427.20 474.68 427.16 422.00 427.16 C 417.78 427.21 413.74 425.11 411.15 421.82 C 356.49 353.53 301.86 285.21 247.20 216.91 C 244.88 214.15 243.68 210.58 243.83 206.99 C 243.83 141.01 243.85 75.02 243.81 9.04 C 243.84 7.48 243.78 5.46 245.44 4.65 Z"
                />
                <motion.path
                  ref={svg2}
                  variants={svgVariants}
                  initial="initial"
                  stroke="#ff4655"
                  strokeWidth="2"
                  fill="none"
                  opacity="1.00"
                  d=" M 754.32 4.33 C 756.57 3.48 759.05 5.56 758.72 7.92 C 758.80 73.93 758.71 139.94 758.76 205.95 C 758.91 209.69 758.09 213.56 755.66 216.50 C 739.05 237.28 722.42 258.05 705.81 278.82 C 703.04 282.42 698.51 284.41 693.98 284.18 C 641.65 284.13 589.31 284.21 536.98 284.14 C 533.89 284.62 532.13 280.45 534.41 278.44 C 606.98 187.65 679.61 96.89 752.22 6.12 C 752.77 5.34 753.47 4.74 754.32 4.33 Z"
                />
              </g>
            </svg>
          </div>
        </motion.div>

        <motion.div
          ref={appear}
          variants={appearVariants}
          initial="initial"
          className="flex justify-center items-center flex-col w-fit py-3"
        >
          <Header />
          <BentoGridSecondDemo></BentoGridSecondDemo>
        </motion.div>
      </div>
    </>
  );
};
