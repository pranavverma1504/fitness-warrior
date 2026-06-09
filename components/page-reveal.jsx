"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageReveal({
  children,
  brandName = "Fitness Warrior",
  onComplete = () => {},
}) {
  const [phase, setPhase] = useState("loading");
  const [loadingNumber, setLoadingNumber] = useState(0);

  // Aggressive scroll reset for Next.js and persistent browsers
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. Immediately disable manual restoration 
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      
      // 2. Fire immediate reset, and trailing reset for late-paint engines
      window.scrollTo(0, 0);
      const timer = setTimeout(() => {
         window.scrollTo(0, 0);
      }, 50);
      
      // 3. Override unload state to trick browser into caching top coordinate
      window.onbeforeunload = () => {
         window.scrollTo(0, 0);
      };

      return () => clearTimeout(timer);
    }
  }, []);

  // 1. Smooth Loading Number Animation (0 → 100 fluidly)
  useEffect(() => {
    if (phase !== "loading") return;

    let startTime = null;
    const duration = 2500; // Smooth 2.5s loading experience

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use easeOutQuad for slightly faster start, smoother end
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      const currentNumber = Math.floor(easeProgress * 100);
      
      setLoadingNumber(currentNumber);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Short pause at 100% before transition
        setTimeout(() => setPhase("logo"), 500);
      }
    };

    const requestId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestId);
  }, [phase]);

  // Phase transitions
  useEffect(() => {
    if (phase === "logo") {
      const t = setTimeout(() => setPhase("split"), 1400);
      return () => clearTimeout(t);
    }

    if (phase === "split") {
      const t = setTimeout(() => {
        setPhase("complete");
        if (onComplete) onComplete();
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  // Helper to style "Fitness" in red and "Warrior" in white
  const renderBrandName = () => {
    const parts = brandName.split(" ");
    if (parts.length >= 2) {
      return (
        <div className="font-serif italic tracking-[0.1em]">
          <span style={{ color: "#c1121f" }}>{parts[0]}</span>{" "}
          <span className="text-white">{parts.slice(1).join(" ")}</span>
        </div>
      );
    }
    return brandName;
  };

  return (
    <div className="relative">
      {/* MAIN CONTENT - Fade in during/after split */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: phase === "complete" || phase === "split" ? 1 : 0 
        }}
        transition={{ 
          duration: 1, 
          delay: phase === "split" ? 0.5 : 0,
          ease: "easeOut" 
        }}
        className="relative z-0"
      >
        {children}
      </motion.div>

      {/* ANIMATION OVERLAY */}
      <AnimatePresence>
        {phase !== "complete" && (
          <motion.div
            className="fixed inset-0 z-[9999] overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Phase 1: Loading (Smooth fluid UI) */}
            {phase === "loading" && (
              <motion.div
                className="absolute inset-0 bg-zinc-900 flex items-center justify-center"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex flex-col items-center gap-12">
                  {/* Numbers - Tabular for stability during count */}
                  <div className="text-8xl md:text-9xl font-light text-white tabular-nums tracking-tighter flex items-center">
                    {loadingNumber.toString().padStart(2, "0")}
                    <span className="text-white ml-2 font-thin">%</span>
                  </div>

                  {/* Continuous Circular Loader */}
                  <div className="relative">
                    <svg className="w-32 h-32" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#2a2a2a"
                        strokeWidth="1"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeDasharray="283"
                        animate={{
                          strokeDashoffset: 283 - (283 * loadingNumber) / 100,
                        }}
                        transition={{ 
                          type: "tween",
                          ease: "linear",
                          duration: 0.1 // Match high-frequency updates from RAF
                        }}
                        style={{
                          transformOrigin: "center",
                          transform: "rotate(-90deg)",
                        }}
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Phase 2: Logo Reveal (Styled brand name) */}
            {phase === "logo" && (
              <motion.div 
                className="absolute inset-0 bg-zinc-900 flex items-start md:items-center justify-center overflow-hidden pt-[30vh] md:pt-0"
                exit={{ opacity: 0 }}
              >
                <div className="overflow-hidden px-4 text-center">
                  <motion.h1
                    className="text-4xl sm:text-5xl md:text-8xl font-medium uppercase"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 1.2,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                  >
                    {renderBrandName()}
                  </motion.h1>
                </div>
              </motion.div>
            )}

            {/* Phase 3: Premium Split Reveal */}
            {phase === "split" && (
              <div className="absolute inset-0 flex">
                <motion.div
                  className="w-1/2 h-full bg-zinc-900 border-r border-white/5"
                  initial={{ x: 0 }}
                  animate={{ x: "-100%" }}
                  transition={{
                    duration: 1.4,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                />
                <motion.div
                  className="w-1/2 h-full bg-zinc-900 border-l border-white/5"
                  initial={{ x: 0 }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 1.4,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
