"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

/* ─────────────────────────── DATA ─────────────────────────── */

const PLANS = [
  {
    num: "01",
    name: "Basic",
    price: "999",
    period: "Monthly",
    desc: "A solid foundation for focused fitness warriors.",
    features: [
      "Access to Gym Equipment",
      "Cardio & Strength Area",
      "General Workout Guidance",
      "Flexible Timings",
    ],
  },
  {
    num: "02",
    name: "Standard",
    price: "1,499",
    period: "Monthly",
    desc: "Elevated access with professional guidance.",
    features: [
      "Everything in Basic",
      "Personal Trainer Support",
      "Diet Guidance (Basic)",
      "Access to CrossFit Sessions",
    ],
  },
  {
    num: "03",
    name: "Premium",
    price: "2,499",
    period: "Monthly",
    desc: "Unrestricted access for peak performance.",
    features: [
      "Everything in Standard",
      "Dedicated Personal Trainer",
      "Customized Workout Plan",
      "Advanced Diet Plan",
      "Priority Support",
    ],
  },
  {
    num: "04",
    name: "Pro Transform",
    price: "4,999",
    period: "Monthly",
    desc: "The ultimate transformation for dedicated elite.",
    features: [
      "Body Transformation Program",
      "1-on-1 Personal Training",
      "Weekly Progress Tracking",
      "Personalized Diet & Workout",
      "Fat Loss / Muscle Gain Focus",
    ],
  },
];

/* ─────────────────────────── MAIN ─────────────────────────── */

export default function Pricing() {
  const [active, setActive] = useState(0);

  const goLeft = () => setActive((p) => (p === 0 ? PLANS.length - 1 : p - 1));
  const goRight = () => setActive((p) => (p === PLANS.length - 1 ? 0 : p + 1));

  /*
   * Layout math (desktop):
   *   cardW  = 54vw
   *   gap    = 3vw
   *   step   = cardW + gap = 57vw
   *   Track offset to center active card:
   *     translateX = -active * step  (card-0 starts at left:0 of track)
   *   The track itself is placed so card-0 is centred → wrapper uses
   *   paddingLeft = (100vw - cardW) / 2 = 23vw
   */

  // Using calc-friendly vw values via CSS custom properties in the style prop
  const trackX = useMemo(() => `calc(-${active} * (54vw + 3vw))`, [active]);

  return (
    <section
      id="pricing"
      className="relative bg-black overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* ── Background ── */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-[0.05] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #c1121f 0%, transparent 70%)" }}
      />

      {/* ── Header ── */}
      <div className="text-center pt-24 pb-14 md:pt-28 md:pb-16 relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-5"
        >
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          <span className="text-primary text-[9px] md:text-[10px] font-bold tracking-[0.35em] uppercase">
            Membership Plans
          </span>
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading text-5xl sm:text-6xl md:text-[7rem] lg:text-[8rem] text-white leading-[0.85] tracking-tighter uppercase"
        >
          <span className="sr-only">Fitness Warrior Membership Plans and Pricing in Bhilai - </span>
          Our <span className="text-primary">Pricing</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-500 text-[10px] md:text-xs tracking-[0.25em] uppercase max-w-lg mx-auto leading-relaxed mt-5"
        >
          Choose your warrior path. Every plan is built to push you closer to your ultimate transformation.
        </motion.p>
      </div>

      {/* ── Card Carousel ── */}
      {/* Outer wrapper: full width, overflow hidden so side cards clip at viewport edge */}
      <div className="relative w-full overflow-hidden pb-8">
        {/*
          Inner track: a flex row of cards.
          paddingLeft centres card-0 on screen: (100vw - 54vw) / 2 = 23vw
          We animate translateX to slide the track when active changes.
        */}
        <motion.div
          className="flex gap-[3vw] will-change-transform"
          animate={{ x: trackX }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 30,
            mass: 1,
          }}
          style={{
            paddingLeft: "calc((100vw - 54vw) / 2)",
            paddingRight: "calc((100vw - 54vw) / 2)",
          }}
        >
          {PLANS.map((plan, idx) => {
            const isActive = idx === active;

            return (
              <motion.div
                key={plan.num}
                className="flex-shrink-0 cursor-pointer"
                style={{ width: "54vw" }}
                onClick={() => setActive(idx)}
                animate={{
                  scale: isActive ? 1 : 0.88,
                  opacity: isActive ? 1 : 0.4,
                  filter: isActive ? "blur(0px)" : "blur(3px)",
                }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              >
                <div
                  className={`relative rounded-3xl overflow-hidden border transition-colors duration-500 ${
                    isActive
                      ? "border-primary/30"
                      : "border-white/[0.05]"
                  }`}
                  style={{
                    background: isActive
                      ? "linear-gradient(165deg, #151515 0%, #0e0e0e 50%, #0b0b0b 100%)"
                      : "#0a0a0a",
                    boxShadow: isActive
                      ? "0 0 80px rgba(193,18,31,0.08), 0 20px 60px rgba(0,0,0,0.5)"
                      : "0 8px 30px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* Active top accent */}
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                  )}

                  <div className="p-8 md:p-10 lg:p-12 xl:p-14">
                    {/* Header row */}
                    <div className="flex items-start justify-between mb-6 md:mb-8">
                      <div>
                        <span className="text-[9px] md:text-[10px] text-primary font-bold tracking-[0.4em] uppercase block mb-2">
                          Plan {plan.num}
                        </span>
                        <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white uppercase tracking-tight leading-none">
                          {plan.name}
                        </h3>
                      </div>
                      <div
                        className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "linear-gradient(135deg, rgba(193,18,31,0.15) 0%, rgba(193,18,31,0.05) 100%)",
                          border: "1px solid rgba(193,18,31,0.2)",
                        }}
                      >
                        <svg viewBox="0 0 24 24" fill="#c1121f" className="w-5 h-5 md:w-6 md:h-6 opacity-80" aria-hidden="true">
                          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.3L12 16.7l-6.2 4.5 2.4-7.3L2 9.4h7.6z" />
                        </svg>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-500 text-[10px] md:text-xs tracking-wider uppercase leading-relaxed mb-8 max-w-md">
                      {plan.desc}
                    </p>

                    {/* Price */}
                    <div className="flex items-end gap-1.5 md:gap-2 mb-8 md:mb-10">
                      <span className="text-primary text-xl md:text-2xl font-bold leading-none mb-1">₹</span>
                      <span className="font-heading text-6xl md:text-7xl lg:text-8xl xl:text-[6rem] text-white tracking-tighter leading-[0.75]">
                        {plan.price}
                      </span>
                      <span className="text-gray-600 text-[9px] md:text-[10px] font-bold tracking-widest uppercase mb-2 ml-1.5">
                        / {plan.period}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="h-[1px] w-full bg-gradient-to-r from-primary/20 via-white/5 to-transparent mb-8" />

                    {/* Features — 2 col on desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      {plan.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/10 border border-primary/20">
                            <svg viewBox="0 0 16 16" fill="currentColor" className="w-2.5 h-2.5 text-primary" aria-hidden="true">
                              <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                            </svg>
                          </div>
                          <span className="text-gray-400 text-[11px] md:text-xs tracking-wider uppercase">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ── Nav Arrows + Dots ── */}
      <div className="relative z-10 flex items-center justify-center gap-6 pb-20 pt-6">
        {/* Left */}
        <motion.button
          onClick={goLeft}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 hover:border-primary/40 bg-[#111] hover:bg-primary/10 flex items-center justify-center text-gray-400 hover:text-primary transition-all duration-300"
          aria-label="Previous plan"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        {/* Dots */}
        <div className="flex gap-2.5">
          {PLANS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={`h-2 rounded-full transition-all duration-500 ${
                idx === active
                  ? "w-8 bg-primary shadow-[0_0_8px_rgba(193,18,31,0.5)]"
                  : "w-2 bg-white/15 hover:bg-white/30"
              }`}
              aria-label={`Go to plan ${idx + 1}`}
            />
          ))}
        </div>

        {/* Right */}
        <motion.button
          onClick={goRight}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 hover:border-primary/40 bg-[#111] hover:bg-primary/10 flex items-center justify-center text-gray-400 hover:text-primary transition-all duration-300"
          aria-label="Next plan"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </section>
  );
}
