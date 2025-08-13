"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";

export default function Stages() {
  const controlsLeft = useAnimation();
  const controlsRight = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.8 });
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;
      lastScrollY.current = currentScrollY;

     if (inView) {
  if (scrollingDown) {
    // Move cards farther apart after flipping
    controlsLeft.start({ rotateY: 180, x: "-40px", transition: { duration: 1 } });
    controlsRight.start({ rotateY: 180, x: "40px", transition: { duration: 1 } });
  } else {
    // Move cards closer before flipping back
    controlsLeft.start({ rotateY: 0, x: "10px", transition: { duration: 1 } });
    controlsRight.start({ rotateY: 0, x: "-10px", transition: { duration: 1 } });
  }
}
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [inView, controlsLeft, controlsRight]);

  const cardStyles =
    "relative w-[300px] h-[450px] [transform-style:preserve-3d]";

  const faceStyles =
    "absolute inset-0 [backface-visibility:hidden]";

  return (
    <div
      ref={ref}
      className="min-h-screen w-full bg-contain bg-center relative"
      style={{
        backgroundImage:
          "url('https://i.postimg.cc/YCWfdB6y/Whats-App-Image-2025-08-13-at-14-42-49-a5e7aacb-1.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Top title */}
      <div className="absolute top-10 w-full flex flex-col items-center text-white pb-12">
        <p className="text-lg tracking-widest mb-4">STAGES OF</p>
        <Image
          src="https://i.postimg.cc/ZR1DW5j4/oracle.png"
          alt="Oracle"
          width={200}
          height={200}
          priority
        />
        <div className="mt-6"></div>
      </div>

      {/* Cards */}
      <div className="flex justify-center items-center h-screen relative">
        {/* Left card */}
        <motion.div
          animate={controlsLeft}
          initial={{ rotateY: 0 }}
          className={`${cardStyles} absolute transform translate-y-16 z-10`}
        >
          {/* Front */}
          <div className={faceStyles}>
            <img
              src="https://i.postimg.cc/d0FHdVb9/Brightness-Contrast-1-3.png"
              alt="Card 1 Front"
              className="w-full h-full object-contain"
            />
          </div>
          {/* Back */}
          <div
            className={`${faceStyles} [transform:rotateY(180deg)]`}
          >
            <img
              src="https://i.postimg.cc/NjMS4x2C/Group-7.png"
              alt="Card 1 Back"
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        {/* Right card */}
        <motion.div
          animate={controlsRight}
          initial={{ rotateY: 0 }}
          className={`${cardStyles} absolute transform translate-y-16 z-20`}
        >
          {/* Front */}
          <div className={faceStyles}>
            <img
              src="https://i.postimg.cc/KY3XZY0G/Brightness-Contrast-1-2.png"
              alt="Card 2 Front"
              className="w-full h-full object-contain"
            />
          </div>
          {/* Back */}
          <div
            className={`${faceStyles} [transform:rotateY(180deg)]`}
          >
            <img
              src="https://i.postimg.cc/Njd9hQMf/Group-6.png"
              alt="Card 2 Back"
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
