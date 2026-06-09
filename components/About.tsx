"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import { viewportOnce } from "@/animations/variants";

const line1 = "WE BUILD STRONG".split(" ");
const line2 = "WARRIORS,".split(" ");
const line3 = "TRANSFORMING YOUR FITNESS JOURNEY".split(" ");

const wordAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

const RadarGrid = memo(() => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.15]">
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
      className="relative flex items-center justify-center"
    >
      {[1, 2, 3, 4, 5, 6, 7, 8].map((circle) => (
        <div
          key={circle}
          className="absolute rounded-full border border-white/20"
          style={{
            width: `${circle * 240}px`,
            height: `${circle * 240}px`,
          }}
        />
      ))}
      <div className="absolute w-[800px] h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent origin-center rotate-45" />
    </motion.div>
  </div>
));
RadarGrid.displayName = "RadarGrid";

function About() {
  return (
    <section
      id="about"
      className="relative z-10 min-h-[100vh] md:min-h-[150vh] flex items-center justify-center bg-[#0d1117] overflow-hidden section-padding px-4 py-20 md:py-0"
    >
      {/* ── BACKGROUND HUD ELEMENTS ────────────────────────────────────── */}
      <RadarGrid />

      {/* Center Crosshairs */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-white/40 to-transparent" />
      </div>

      {/* Corner Brackets */}
      <div className="absolute inset-0 pointer-events-none p-12 opacity-40">
        <div className="absolute top-12 left-12 w-12 h-12 border-t-2 border-l-2 border-white/60" />
        <div className="absolute top-12 right-12 w-12 h-12 border-t-2 border-r-2 border-white/60" />
        <div className="absolute bottom-12 left-12 w-12 h-12 border-b-2 border-l-2 border-white/60" />
        <div className="absolute bottom-12 right-12 w-12 h-12 border-b-2 border-r-2 border-white/60" />
      </div>

      {/* HUD Text Labels */}
      <div className="absolute inset-0 pointer-events-none text-white/40 text-[10px] font-bold tracking-[0.4em] p-16 select-none uppercase">
        <div className="absolute top-16 left-1/2 -translate-x-1/2">[ ABOUT US ]</div>
        <div className="absolute top-1/2 left-16 -translate-y-1/2 -rotate-90">WE ARE HERE</div>
        <div className="absolute bottom-16 right-16 flex flex-col gap-2 items-end">
          <span className="text-primary">SEC: 42.091</span>
          <span>UNIT: WARRIOR ALPHA-MAX</span>
          <span className="text-[8px] tracking-[0.2em] font-light mt-2 text-white/20">TARGET LOCKED // SENSOR ACTIVE</span>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-noise" />

      {/* ── CORE CONTENT ──────────────────────────────────────────────── */}
      <div className="relative z-10 text-center container-max px-4">
        <div className="font-heading text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[10rem] leading-[0.9] md:leading-[0.8] tracking-tighter uppercase flex flex-col items-center">
          <div className="block italic font-light opacity-80 mb-2 transform md:translate-x-[-2%]">
            {line1.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                className="inline-block mr-[0.2em] last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </div>

          <div className="block mb-4 scale-y-110">
            {line2.map((word, i) => (
              <motion.span
                key={i}
                custom={i + line1.length}
                variants={wordAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                className="inline-block text-[#c1121f]"
              >
                {word}
              </motion.span>
            ))}
          </div>

          <div className="block text-xl sm:text-2xl md:text-4xl lg:text-6xl tracking-[0.2em] md:tracking-[0.3em] mt-6 md:mt-10 font-black opacity-90">
            {line3.map((word, i) => (
               <motion.span
                key={i}
                custom={i + line1.length + line2.length}
                variants={wordAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                className="inline-block mr-[0.3em] last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>
        
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "200px" }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: (line1.length + line2.length + line3.length) * 0.08 + 0.2, duration: 1 }}
          className="h-[2px] bg-[#c1121f] mt-12 mx-auto" 
        />
      </div>
    </section>
  );
}

export default memo(About);
