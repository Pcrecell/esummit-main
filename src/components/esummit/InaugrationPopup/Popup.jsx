"use client"

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { Poppins } from "next/font/google";


// const poppins = Poppins({
//   weight: 400,
  
// })
const Popup = () => {
  const [closed, setClosed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if popup has been shown before
    const popupShown = localStorage.getItem('orientationPopupShown');
    if (!popupShown) {
      setClosed(false);
    }
  }, []);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1224);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Disable scroll when popup is open
  useEffect(() => {
    const scrollYRef = { current: window.scrollY };
    let scrollbarWidth = 0;

    const disableScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const disableKeys = (e) => {
      const keys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", " ", "Spacebar"];
      if (keys.includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    if (!closed) {
      scrollYRef.current = window.scrollY;
      scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.cssText = `
        position: fixed;
        top: -${scrollYRef.current}px;
        left: 0;
        width: 100%;
        overflow-y: hidden;
        padding-right: ${scrollbarWidth}px;
        height: 100%;
      `;

      document.documentElement.style.overflow = "hidden";

      window.addEventListener("scroll", disableScroll, { passive: false, capture: true });
      window.addEventListener("wheel", disableScroll, { passive: false, capture: true });
      window.addEventListener("touchmove", disableScroll, { passive: false, capture: true });
      window.addEventListener("keydown", disableKeys, { passive: false, capture: true });
    } else {
      const scrollY = Math.abs(parseInt(document.body.style.top || "0", 10)) || scrollYRef.current;

      document.body.style.cssText = "";
      document.documentElement.style.overflow = "";

      requestAnimationFrame(() => {
        window.scrollTo(0, scrollY);
      });

      window.removeEventListener("scroll", disableScroll, { capture: true });
      window.removeEventListener("wheel", disableScroll, { capture: true });
      window.removeEventListener("touchmove", disableScroll, { capture: true });
      window.removeEventListener("keydown", disableKeys, { capture: true });
    }

    return () => {
      const scrollY = Math.abs(parseInt(document.body.style.top || "0", 10)) || scrollYRef.current;
      document.body.style.cssText = "";
      document.documentElement.style.overflow = "";
      window.scrollTo(0, scrollY);
      window.removeEventListener("scroll", disableScroll, { capture: true });
      window.removeEventListener("wheel", disableScroll, { capture: true });
      window.removeEventListener("touchmove", disableScroll, { capture: true });
      window.removeEventListener("keydown", disableKeys, { capture: true });
    };
  }, [closed]);

  // Auto-open popup is now disabled - popup shows by default
  // useEffect(() => {
  //   const timer = setTimeout(() => setClosed(false), 2000);
  //   return () => clearTimeout(timer);
  // }, []);

  const handleClose = () => {
    setClosed(true);
    setHasShown(true);
    localStorage.setItem('orientationPopupShown', 'true');
  };

  const handleReopen = () => {
    setClosed(false);
  };

  const popupWidth = isMobile ? "90vw" : isTablet ? "90vw" : "800px";
  const popupMaxWidth = isMobile ? "350px" : isTablet ? "600px" : "800px";

  return (
    <>
      <AnimatePresence>
        {!closed && (
          <motion.div
            className="fixed inset-0 z-[9998] flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0  bg-black backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleClose}
            />
            
            {/* Popup Content */}
            <motion.div
              className="relative z-[9999] bg-white rounded-lg shadow-2xl overflow-hidden py-24"
              style={{ width: popupWidth, maxWidth: popupMaxWidth,
                backgroundImage: "url('https://ik.imagekit.io/ecellkiit/E-Cell%20Website/founderarena.webp?updatedAt=1755413558055')",
                backgroundSize: isMobile ? "230%" : "cover",
                backgroundPosition: "center center",
                backgroundColor: "black"
               }}
               initial={{ opacity: 0, scale: 0.8, y: 50 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.8, y: 50 }}
               transition={{ 
                 duration: 0.4, 
                 ease: [0.25, 0.46, 0.45, 0.94],
                 opacity: { duration: 0.3 }
                }}
                >
              {/* Black Overlay */}
              <div className="absolute top-0 left-0 bg-gradient-to-b from-black/60 to-transparent z-[60] w-full h-full"/>
              
              {/* Success Icon */}
              <div className="relative z-[70] flex justify-center pt-8 pb-4">
                <motion.div
                  className="w-48 h-auto rounded-full flex items-center justify-center"
                  // initial={{ scale: 0, rotate: -180 }}
                  // animate={{ scale: 1, rotate: 0 }}
                  // transition={{ delay: 0.2, duration: 0.5, ease: [0.68, -0.55, 0.265, 1.55] }}
                >
                  {/* <svg 
                    className="w-8 h-8 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    />
                  </svg> */}
                  <img src="https://ik.imagekit.io/ecellkiit/E-Cell%20Website/logo.png?updatedAt=1755075880371" alt="" />
                </motion.div>
              </div>

              {/* Content */}
              <motion.div
                className="relative z-[70] px-6 pb-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <h2 className="text-2xl font-semibold text-white mb-4">
                  ORIENTATION CEREMONY
                </h2>
                <p className="text-gray-200 text-sm leading-relaxed mb-6 px-2">
                  Tune in to the live stream and be part of the historic kickoff of E-Summit 2025.
                </p>
                <h2 className="text-2xl text-white mb-4">
                  Date: <span className = "font-semibold">17th August 2025</span>
                </h2>
                <h2 className="text-2xl text-white mb-4">
                  Venue: <span className= "font-semibold">Campus 6</span>
                </h2>
                
                {/* Close Button */}
                <motion.button
                  onClick={handleClose}
                  className="w-full bg-green-500 max-w-md translate-y-12 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  Close
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Reopen Button */}
      <AnimatePresence>
        {closed && (
          <motion.div
            className="fixed bottom-6 right-6 z-[9997]"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <motion.button
              onClick={handleReopen}
              className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center text-white transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Popup;