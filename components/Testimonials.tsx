"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

/* ─────────────────────────── STATS DATA ─────────────────────────── */

const STATS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#c1121f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 md:w-12 md:h-12" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    value: "250+",
    label: "Active Members",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#c1121f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 md:w-12 md:h-12" aria-hidden="true">
        <path d="M18 8h2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2" />
        <path d="M6 8H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2" />
        <rect x="8" y="4" width="2" height="16" rx="1" />
        <rect x="14" y="4" width="2" height="16" rx="1" />
        <line x1="3" y1="12" x2="21" y2="12" />
      </svg>
    ),
    value: "10+",
    label: "Certified Trainers",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#c1121f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 md:w-12 md:h-12" aria-hidden="true">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
        <path d="M12 2a6 6 0 0 1 6 6v5a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z" />
      </svg>
    ),
    value: "12+",
    label: "Years of Excellence",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#c1121f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 md:w-12 md:h-12" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    value: "Latest",
    label: "Modern Machines",
  },
];

/* ─────────────────────────── CONFESSIONS DATA ─────────────────────────── */

interface Confession {
  text: string;
  name: string;
  role: string;
  initials: string;
  variant: "light" | "red";
  rotation: number;
}

const CONFESSIONS: Confession[] = [
  {
    text: "I lost 18kg in 6 months and gained confidence I never thought possible.",
    name: "Anjali Mishra",
    role: "Weight Loss Journey",
    initials: "AM",
    variant: "light",
    rotation: -2,
  },
  {
    text: "Clean equipment, great trainers, and a motivating environment every day.",
    name: "Priya Verma",
    role: "Zumba Enthusiast",
    initials: "PV",
    variant: "red",
    rotation: 3,
  },
  {
    text: "The best affordable gym in the city with premium facilities.",
    name: "Vikram Singh",
    role: "Fitness Member",
    initials: "VS",
    variant: "light",
    rotation: -4,
  },
  {
    text: "From beginner to deadlifting 140kg — Fitness Warrior changed my mindset.",
    name: "Amit Patel",
    role: "Strength Training",
    initials: "AP",
    variant: "red",
    rotation: 2,
  },
  {
    text: "Professional coaches, modern machines, and a community that pushes you forward.",
    name: "Rahul Sharma",
    role: "CrossFit Athlete",
    initials: "RS",
    variant: "light",
    rotation: -3,
  },
];

/* ─────────────────────────── GRID POSITIONS ─────────────────────────── */

/*
  Each card gets a CSS grid area plus a nudge offset for the scattered feel.
  On desktop this creates an organic editorial composition with partial overlaps.
*/
const CARD_POSITIONS: {
  gridColumn: string;
  gridRow: string;
  nudgeX: number;
  nudgeY: number;
  zIndex: number;
}[] = [
  { gridColumn: "1 / 6",   gridRow: "1 / 2",  nudgeX: 20,   nudgeY: 0,    zIndex: 2 },
  { gridColumn: "6 / 12",  gridRow: "1 / 2",  nudgeX: -10,  nudgeY: 40,   zIndex: 3 },
  { gridColumn: "2 / 7",   gridRow: "2 / 3",  nudgeX: -15,  nudgeY: -30,  zIndex: 1 },
  { gridColumn: "7 / 12",  gridRow: "2 / 3",  nudgeX: 10,   nudgeY: -10,  zIndex: 4 },
  { gridColumn: "3 / 9",   gridRow: "3 / 4",  nudgeX: 30,   nudgeY: -40,  zIndex: 2 },
];

/* ─────────────────────────── CONFESSION CARD ─────────────────────────── */

function ConfessionCard({
  confession,
  index,
}: {
  confession: Confession;
  index: number;
}) {
  const pos = CARD_POSITIONS[index];
  const isRed = confession.variant === "red";

  /* Floating animation — each card floats on a slightly different cycle */
  const floatDuration = 5 + index * 0.7;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="confession-card-wrapper"
      style={{
        gridColumn: pos.gridColumn,
        gridRow: pos.gridRow,
        zIndex: pos.zIndex,
      }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          y: -12,
          scale: 1.03,
          boxShadow: isRed
            ? "0 25px 60px rgba(193,18,31,0.35)"
            : "0 25px 60px rgba(0,0,0,0.4)",
          transition: { duration: 0.35, ease: "easeOut" },
        }}
        className={`confession-card ${isRed ? "confession-card--red" : "confession-card--light"}`}
        style={{
          transform: `translate(${pos.nudgeX}px, ${pos.nudgeY}px) rotate(${confession.rotation}deg)`,
        }}
      >
        {/* Red glow behind red cards */}
        {isRed && (
          <div
            className="absolute -inset-8 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(ellipse, #c1121f 0%, transparent 70%)" }}
          />
        )}

        {/* Quote mark */}
        <span
          className={`absolute top-4 left-6 font-heading text-7xl leading-none select-none pointer-events-none ${
            isRed ? "text-white/15" : "text-[#c1121f]/15"
          }`}
        >
          &#8220;
        </span>

        {/* Content */}
        <div className="relative z-10">
          <p
            className={`text-lg sm:text-xl md:text-2xl leading-snug font-medium tracking-tight mb-8 ${
              isRed ? "text-white" : "text-[#1a1a1a]"
            }`}
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            &ldquo;{confession.text}&rdquo;
          </p>

          {/* Divider */}
          <div
            className={`w-10 h-[2px] mb-5 ${
              isRed ? "bg-white/30" : "bg-[#c1121f]/25"
            }`}
          />

          {/* Attribution */}
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                isRed
                  ? "bg-white/20 text-white"
                  : "bg-[#c1121f] text-white"
              }`}
            >
              {confession.initials}
            </div>
            <div>
              <p
                className={`text-sm font-semibold leading-tight ${
                  isRed ? "text-white" : "text-[#1a1a1a]"
                }`}
              >
                {confession.name}
              </p>
              <p
                className={`text-[10px] font-bold tracking-[0.2em] uppercase mt-0.5 ${
                  isRed ? "text-white/60" : "text-[#c1121f]"
                }`}
              >
                {confession.role}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────── STAT CARD ─────────────────────────── */

function StatCard({ stat, index }: { stat: (typeof STATS)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center px-6 py-10 group relative"
    >
      {/* Vertical divider */}
      {index < STATS.length - 1 && (
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-14 bg-white/8" />
      )}

      {/* Icon */}
      <div className="relative mb-5">
        <div className="relative">{stat.icon}</div>
      </div>

      {/* Number */}
      <span className="font-heading text-4xl md:text-5xl lg:text-6xl text-white tracking-wider leading-none transition-colors duration-300">
        {stat.value}
      </span>

      {/* Label */}
      <span className="text-gray-500 text-[9px] md:text-[10px] font-bold tracking-[0.25em] uppercase mt-2">
        {stat.label}
      </span>
    </motion.div>
  );
}

/* ─────────────────────────── INLINE STYLES ─────────────────────────── */

const sectionStyles = `
  .confession-card-wrapper {
    display: flex;
    align-items: start;
    justify-content: center;
  }

  .confession-card {
    position: relative;
    border-radius: 16px;
    padding: 40px 36px;
    width: 100%;
    max-width: 480px;
    cursor: default;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .confession-card--light {
    background: linear-gradient(145deg, #f8f5ef 0%, #f0ece4 100%);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .confession-card--red {
    background: linear-gradient(145deg, #c1121f 0%, #960d17 100%);
    box-shadow: 0 12px 40px rgba(193, 18, 31, 0.2), 0 4px 16px rgba(0, 0, 0, 0.3);
  }

  /* ── Desktop scattered grid ── */
  .confessions-grid {
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    grid-template-rows: auto auto auto;
    gap: 20px;
    padding: 0 20px;
  }

  /* ── Tablet ── */
  @media (max-width: 1024px) {
    .confessions-grid {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: auto;
      gap: 28px;
      padding: 0 16px;
    }

    .confession-card-wrapper {
      grid-column: auto !important;
      grid-row: auto !important;
    }

    .confession-card {
      transform: none !important;
      max-width: 100%;
    }

    .confession-card-wrapper:last-child {
      grid-column: 1 / -1 !important;
      justify-content: center;
    }
  }

  /* ── Mobile ── */
  @media (max-width: 640px) {
    .confessions-grid {
      grid-template-columns: 1fr;
      gap: 20px;
      padding: 0 8px;
    }

    .confession-card-wrapper:last-child {
      grid-column: auto !important;
    }

    .confession-card {
      padding: 28px 24px;
      border-radius: 14px;
    }
  }

  /* ── Floating keyframe for ambient glow ── */
  @keyframes glow-drift {
    0%, 100% { opacity: 0.08; transform: translateY(0); }
    50% { opacity: 0.14; transform: translateY(-10px); }
  }
`;

/* ─────────────────────────── MAIN EXPORT ─────────────────────────── */

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-black overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: sectionStyles }} />

      {/* ══ PART 1 — HERO STATS ══════════════════════════════════════ */}
      <div className="relative py-24 px-4 md:px-8">

        {/* Background grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Red ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full opacity-[0.08] blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #c1121f 0%, transparent 70%)" }}
        />

        <div className="container-max">

          {/* ── Rotating Badge ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-10"
          >
            <div className="relative w-20 h-20 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
                  <path
                    id="tCirclePath"
                    d="M 40,40 m -31,0 a 31,31 0 1,1 62,0 a 31,31 0 1,1 -62,0"
                    fill="none"
                  />
                  <text fontSize="6.5" fill="#c1121f" opacity="0.65" letterSpacing="2.8">
                    <textPath href="#tCirclePath">
                      FITNESS WARRIOR • BHILAI • EXCELLENCE •{" "}
                    </textPath>
                  </text>
                </svg>
              </motion.div>
              {/* Centre star */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #c1121f 0%, #7f0000 100%)",
                  boxShadow: "0 0 32px rgba(193,18,31,0.55)",
                }}
              >
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5" aria-hidden="true">
                  <path d="M12 2l2.39 7.26H22l-6.19 4.5 2.36 7.24L12 17l-6.17 4L8.19 13.76 2 9.26h7.61z" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* ── Pill tag ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center mb-5"
          >
            <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase px-4 py-2 rounded-full">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              Real Warriors · Real Results
            </span>
          </motion.div>

          {/* ── Heading ── */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-center font-heading text-5xl sm:text-6xl md:text-[7rem] lg:text-[8rem] text-white leading-[0.85] tracking-tighter uppercase mb-4"
          >
            It&apos;s Not Just a Gym
            <br />
            It&apos;s an{" "}
            <span className="text-primary">Experience.</span>
          </motion.h2>

          {/* ── Sub-copy ── */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-center text-gray-500 text-[10px] md:text-xs tracking-[0.25em] uppercase max-w-xl mx-auto leading-relaxed mt-2 mb-16"
          >
            Where fitness meets motivation, community, and personal growth.
          </motion.p>

          {/* ── Stats Grid ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 border border-white/5 rounded-2xl overflow-hidden bg-[#0d0d0d]"
            style={{ boxShadow: "0 0 60px rgba(193,18,31,0.05)" }}
          >
            {STATS.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* ══ DIVIDER ══════════════════════════════════════════════════ */}
      <div className="flex items-center gap-4 px-8 md:px-16 py-2">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <span className="text-primary/40 text-[8px] font-bold tracking-[0.5em] uppercase whitespace-nowrap">
          Member Voices
        </span>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      </div>

      {/* ══ PART 2 — WARRIOR CONFESSIONS ════════════════════════════ */}
      <div className="relative py-20 md:py-28 px-4 md:px-8">

        {/* Background noise texture */}
        <div className="absolute inset-0 bg-noise pointer-events-none" />

        {/* Subtle dark concrete texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Ambient red glows behind the section */}
        <div
          className="absolute top-1/4 left-[15%] w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, #c1121f 0%, transparent 70%)",
            opacity: 0.06,
            filter: "blur(80px)",
            animation: "glow-drift 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/4 right-[10%] w-[350px] h-[350px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, #c1121f 0%, transparent 70%)",
            opacity: 0.05,
            filter: "blur(80px)",
            animation: "glow-drift 10s ease-in-out infinite 2s",
          }}
        />

        <div className="container-max relative z-10">

          {/* ── Section Label ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase px-4 py-2 rounded-full">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              Member Stories
            </span>
          </motion.div>

          {/* ── Editorial Heading ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-center mb-16 md:mb-24"
          >
            <h3 className="font-heading text-6xl sm:text-7xl md:text-[8rem] lg:text-[10rem] text-white leading-[0.85] tracking-tighter uppercase">
              Warrior
              <br />
              <span className="text-primary">Confessions</span>
            </h3>
            <p className="text-gray-500 text-[10px] md:text-xs tracking-[0.25em] uppercase max-w-md mx-auto leading-relaxed mt-6">
              Hear from warriors who transformed their lives inside our walls.
            </p>
          </motion.div>

          {/* ── Scattered Card Grid ── */}
          <div className="confessions-grid">
            {CONFESSIONS.map((confession, i) => (
              <ConfessionCard key={i} confession={confession} index={i} />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
