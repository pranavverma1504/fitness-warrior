"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Hero({ isRevealed = false }: { isRevealed?: boolean }) {
  const xRef = useRef<HTMLSpanElement>(null);
  const yRef = useRef<HTMLSpanElement>(null);
  
  // Connect to scroll position for cinematic parallax
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroY = useTransform(scrollY, [0, 600], [0, 150]); // subtle downward pull

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (xRef.current) xRef.current.textContent = String(Math.floor(e.clientX / 10));
      if (yRef.current) yRef.current.textContent = String(Math.floor(e.clientY / 10));
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 80, 
      filter: "blur(10px)" 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { 
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
  };

  return (
    <motion.section
      id="home"
      style={{ opacity, y: heroY }}
      className="sticky top-0 z-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/fitness.webp"
          className="absolute inset-0 w-full h-full object-cover object-[65%_center] md:object-center"
        >
          <source src="/hero_video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none p-6 md:p-10 flex flex-col justify-between">
        <div className="flex justify-between items-start pt-16 md:pt-20">
          <motion.div
             initial={{ opacity: 0 }}
             animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
             transition={{ delay: 0.8 }}
             className="text-[8px] md:text-[9px] font-bold tracking-[0.2em] text-gray-500 leading-none"
          >
             X: <span ref={xRef}>139</span> <br />
             Y: <span ref={yRef}>671</span>
          </motion.div>
        </div>

        <div className="flex justify-between items-end pb-10">
          <motion.div
             variants={containerVariants}
             initial="hidden"
             animate={isRevealed ? "visible" : "hidden"}
             className="relative pt-20"
          >
             <motion.div 
               variants={itemVariants}
               className="flex items-center gap-2 text-[8px] md:text-[10px] font-bold tracking-[0.2em] md:tracking-[0.3em] text-primary mb-3 md:mb-4"
             >
                <span className="w-1 md:w-1.5 h-1 md:h-1.5 bg-primary rounded-full animate-pulse-slow" />
                FITNESS WARRIOR UNIT - ALPHA TRANSFORMATION
             </motion.div>
             
             <h1 className="font-heading text-6xl sm:text-7xl md:text-[8rem] lg:text-9xl tracking-[0.05em] leading-[0.85] md:leading-[0.8] text-white">
                <span className="sr-only">Fitness Warrior: The Best Gym and Fitness Center in Bhilai - </span>
                <div className="overflow-hidden">
                  <motion.span variants={itemVariants} className="inline-block">BEST</motion.span>{" "}
                  <motion.span variants={itemVariants} className="inline-block">GYM</motion.span>
                </div>
                <div className="overflow-hidden">
                  <motion.span variants={itemVariants} className="inline-block">BASED</motion.span>{" "}
                  <motion.span variants={itemVariants} className="inline-block">ON</motion.span>{" "}
                  <motion.span variants={itemVariants} className="inline-block">BHILAI</motion.span>
                </div>
             </h1>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none border border-white/5 opacity-30" 
           style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '100px 100px' }} 
      />
    </motion.section>
  );
}
