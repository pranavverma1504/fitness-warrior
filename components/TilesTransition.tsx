"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const triggerTileTransition = (href: string) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("startTileTransition", { detail: href })
    );
  }
};

export default function TilesTransition() {
  const [active, setActive] = useState(false);
  const [targetHref, setTargetHref] = useState("");

  useEffect(() => {
    const handleStart = (e: any) => {
      if (active) return; // Prevent multiple concurrent transitions
      setTargetHref(e.detail);
      setActive(true);
    };

    window.addEventListener("startTileTransition", handleStart);
    return () => window.removeEventListener("startTileTransition", handleStart);
  }, [active]);

  const cols = 6;
  const rows = 6;
  const total = cols * rows;

  useEffect(() => {
    if (active) {
      // At roughly the peak of the animation (when tiles cover screen), jump to section
      const transitionTimer = setTimeout(() => {
        if (targetHref === "#home") {
          window.scrollTo({ top: 0, behavior: "instant" });
        } else {
          const el = document.querySelector(targetHref);
          if (el) {
            el.scrollIntoView({ behavior: "instant", block: "start" });
          }
        }

        // Add a slight padding before retracting the tiles
        setTimeout(() => {
          setActive(false);
        }, 100);
      }, 700);

      return () => clearTimeout(transitionTimer);
    }
  }, [active, targetHref]);

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      <AnimatePresence>
        {active && (
          <>
            {/* Background blur/dim behind tiles mapping */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
            />
            {/* Main overlay wrapper */}
            <div
              className="absolute inset-0 grid"
              style={{
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
              }}
            >
              {Array.from({ length: total }).map((_, i) => {
                const row = Math.floor(i / cols);
                const col = i % cols;
                // Animate outwards from top left to bottom right diagonally
                const delay = (row + col) * 0.04;

                return (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0, rotate: 15 }}
                    animate={{ scale: 1.05, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0, opacity: 0, rotate: -15 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.83, 0, 0.17, 1], // snappier cubic-bezier
                      delay,
                    }}
                    className="bg-primary w-full h-full origin-center"
                    style={{
                      // Overscale slightly to hide 1px grid seams
                      transformOrigin: "center center",
                    }}
                  />
                );
              })}
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
