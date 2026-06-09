"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const triggerLiquidTransition = (
  href: string,
  clickX?: number,
  clickY?: number
) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("startLiquidTransition", {
        detail: {
          href,
          clickX: clickX ?? window.innerWidth / 2,
          clickY: clickY ?? window.innerHeight / 2,
        },
      })
    );
  }
};

// Freeze scroll using position:fixed trick (works on all browsers including iOS)
function lockScroll() {
  const scrollY = window.scrollY;
  document.body.style.cssText = `overflow: hidden; position: fixed; top: -${scrollY}px; left: 0; width: 100%;`;
  (document.body as any)._savedScrollY = scrollY;
}

// Restore scroll, then jump to target position silently
function unlockAndJump(targetY: number) {
  document.body.style.cssText = "";
  window.scrollTo(0, targetY);
}

export default function LiquidMaskTransition() {
  const [phase, setPhase] = useState<"idle" | "expand" | "collapse">("idle");
  const [origin, setOrigin] = useState({ x: "50%", y: "50%" });
  const isRunning = useRef(false);

  useEffect(() => {
    const handleStart = (e: any) => {
      if (isRunning.current) return;
      isRunning.current = true;

      const { href, clickX, clickY } = e.detail;
      setOrigin({ x: `${clickX}px`, y: `${clickY}px` });

      // 1. Immediately freeze the page — user sees ZERO scroll movement
      lockScroll();

      setPhase("expand");

      // 2. While mask fully covers screen, compute target scroll position and jump
      setTimeout(() => {
        let targetY = 0;
        if (href !== "#home") {
          const el = document.querySelector(href);
          if (el) {
            // getBoundingClientRect is relative to viewport; document.body._savedScrollY
            // restores the original offset before our fixed lock
            const savedScrollY = (document.body as any)._savedScrollY ?? 0;
            targetY = (el as HTMLElement).getBoundingClientRect().top + savedScrollY;
          }
        }

        // 3. Silently unlock and jump to target while mask is covering everything
        unlockAndJump(targetY);

        // 4. Short hold then retract mask
        setTimeout(() => {
          setPhase("collapse");

          // 5. Reset after collapse animation finishes
          setTimeout(() => {
            setPhase("idle");
            isRunning.current = false;
          }, 700);
        }, 100);
      }, 800);
    };

    window.addEventListener("startLiquidTransition", handleStart);
    return () => window.removeEventListener("startLiquidTransition", handleStart);
  }, []);

  const maskSize = "260vmax";

  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none">
      <AnimatePresence>
        {phase !== "idle" && (
          <>
            {/* Soft pre-dim before mask arrives */}
            <motion.div
              key="dim"
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.35)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "expand" ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />

            {/* Main black expanding circle mask */}
            <motion.div
              key="mask"
              className="absolute rounded-full"
              style={{
                width: maskSize,
                height: maskSize,
                top: origin.y,
                left: origin.x,
                translateX: "-50%",
                translateY: "-50%",
                background:
                  "radial-gradient(circle at center, #111111 0%, #050505 60%, #000000 100%)",
                boxShadow:
                  "0 0 60px 10px rgba(0,0,0,0.8), inset 0 0 120px rgba(255,255,255,0.02)",
                filter: "blur(0.5px)",
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={
                phase === "expand"
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0, opacity: 0 }
              }
              transition={{
                duration: phase === "expand" ? 0.8 : 0.65,
                ease:
                  phase === "expand"
                    ? [0.22, 1, 0.36, 1]
                    : [0.64, 0, 0.78, 0],
              }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
