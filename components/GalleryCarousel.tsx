"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";

const GALLERY_ITEMS = [
  {
    src: "/carousel_cardio.webp",
    label: "Cardio Zone",
    tag: "ENDURANCE",
    alt: "Premium cardio machines at Fitness Warrior gym Bhilai",
  },
  {
    src: "/carousel_dumbbells.webp",
    label: "Free Weights",
    tag: "STRENGTH",
    alt: "Chrome dumbbell rack at Fitness Warrior gym Bhilai",
  },
  {
    src: "/carousel_ropes.webp",
    label: "Battle Ropes",
    tag: "POWER",
    alt: "Battle ropes functional training at Fitness Warrior Bhilai",
  },
  {
    src: "/carousel_machines.webp",
    label: "Machine Zone",
    tag: "PRECISION",
    alt: "Modern gym machines at Fitness Warrior Bhilai",
  },
  {
    src: "/carousel_deadlift.webp",
    label: "Deadlift Platform",
    tag: "POWER",
    alt: "Deadlift platform at Fitness Warrior gym Bhilai",
  },
  {
    src: "/carousel_zumba.webp",
    label: "Zumba Studio",
    tag: "ENERGY",
    alt: "Zumba dance fitness class at Fitness Warrior Bhilai",
  },
];

// Duplicate array for seamless infinite loop
const ROW_1 = [...GALLERY_ITEMS, ...GALLERY_ITEMS, ...GALLERY_ITEMS];
const ROW_2 = [...GALLERY_ITEMS].reverse();
const ROW_2_FULL = [...ROW_2, ...ROW_2, ...ROW_2];

function CarouselRow({
  items,
  direction = "left",
  speed = 40,
}: {
  items: typeof ROW_1;
  direction?: "left" | "right";
  speed?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
  };
  const handleMouseLeave = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running";
  };

  return (
    <div
      className="relative overflow-hidden w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Left fade mask */}
      <div className="absolute left-0 top-0 h-full w-24 md:w-40 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #000 0%, transparent 100%)" }} />
      {/* Right fade mask */}
      <div className="absolute right-0 top-0 h-full w-24 md:w-40 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #000 0%, transparent 100%)" }} />

      <div
        ref={trackRef}
        className="flex gap-4 w-max"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className="relative group flex-shrink-0 w-[280px] md:w-[380px] h-[200px] md:h-[260px] rounded-2xl overflow-hidden border border-white/5 cursor-pointer"
            style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.04)" }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover brightness-60 grayscale group-hover:grayscale-0 group-hover:brightness-75 transition-all duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 280px, 380px"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-500" />

            {/* Tag pill top-left */}
            <div className="absolute top-4 left-4 z-10">
              <span className="text-[8px] font-bold tracking-[0.35em] text-primary bg-black/60 border border-primary/30 backdrop-blur-sm px-2.5 py-1 rounded-full uppercase">
                {item.tag}
              </span>
            </div>

            {/* Scan line on hover */}
            <div className="absolute top-0 left-0 w-full h-[1.5px] bg-primary/60 -translate-y-full group-hover:animate-scan z-20 pointer-events-none" />

            {/* Bottom label */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-400">
              <p className="text-white font-heading text-xl md:text-2xl tracking-tight uppercase">
                {item.label}
              </p>
              <div className="h-[1.5px] w-0 group-hover:w-full bg-primary transition-all duration-500 mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GalleryCarousel() {
  return (
    <section className="bg-black py-16 md:py-24 overflow-hidden">
      {/* ── HEADER ── */}
      <div className="container-max px-4 md:px-8 mb-10 md:mb-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full animate-pulse-slow" />
              <span className="text-primary text-[8px] md:text-xs font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase">
                FITNESS WARRIOR
              </span>
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-heading text-white leading-[0.85] tracking-tighter uppercase">
              GYM{" "}
              <span className="text-primary">GALLERY</span>
            </h2>
          </div>
          <p className="max-w-sm text-gray-500 text-[10px] md:text-sm leading-relaxed tracking-wider uppercase font-medium lg:mb-2">
            Explore our well-equipped workout areas, spacious training zones, and facilities designed for effective fitness training.
          </p>
        </motion.div>
      </div>

      {/* ── CAROUSEL ROWS ── */}
      <div className="flex flex-col gap-4">
        <CarouselRow items={ROW_1} direction="left" speed={45} />
        <CarouselRow items={ROW_2_FULL} direction="right" speed={55} />
      </div>

    </section>
  );
}
