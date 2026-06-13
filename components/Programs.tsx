"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/* ── Service Data ──────────────────────────────────────────────────────── */
const SERVICES = [
  {
    id: "01",
    title: "STRENGTH TRAINING",
    desc: "Pure power development through compound lifting and strategic progressive overload protocols.",
    image: "/service_strength.webp",
    alt: "Heavy weightlifting and strength training at Fitness Warrior Bhilai",
  },
  {
    id: "02",
    title: "PERSONAL TRAINING",
    desc: "1-on-1 elite coaching tailored to your biomechanics, goals, and transformation timeline.",
    image: "/service_personal.webp",
    alt: "Personal training and coaching at Fitness Warrior Bhilai",
  },
  {
    id: "03",
    title: "MODERN EQUIPMENTS",
    desc: "Equipped with the latest strength, cardio, and functional training machines for every fitness goal.",
    image: "/service_body_transform.webp",
    alt: "Modern equipment at Fitness Warrior Bhilai",
  },
  {
    id: "04",
    title: "CROSSFIT",
    desc: "High-intensity functional movements designed to build elite physical capability and mental fortitude.",
    image: "/service_crossfit.webp",
    alt: "CrossFit training at Fitness Warrior Bhilai",
  },
  {
    id: "05",
    title: "GROUP CLASSES",
    desc: "High-energy collective training sessions that push limits through shared intensity and motivation.",
    image: "/service_group_class.webp",
    alt: "Group fitness classes at Fitness Warrior Bhilai",
  },
  {
    id: "06",
    title: "ZUMBA FITNESS",
    desc: "Rhythm-driven cardio that torches calories and elevates cardiovascular endurance through dance.",
    image: "/service_zumba.webp",
    alt: "Zumba dance fitness classes at Fitness Warrior Bhilai",
  },
];

/* ── Animation Variants ────────────────────────────────────────────────── */
const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const listContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Component ─────────────────────────────────────────────────────────── */
export default function Services() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    []
  );

  return (
    <section
      id="programs"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative bg-black py-24 md:py-32 lg:py-40 px-4 md:px-8 overflow-hidden"
    >
      {/* ── Concrete texture background ──────────────────────────────── */}
      <div className="absolute inset-0 z-0 opacity-[0.07]">
        <Image
          src="/concrete_texture.webp"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
      </div>

      {/* ── Floating image preview (desktop only) ────────────────────── */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block fixed pointer-events-none z-30"
            style={{
              left: mousePos.x - 180,
              top: mousePos.y - 130,
              width: 360,
              height: 260,
              position: "absolute",
            }}
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl shadow-black/50">
              <Image
                src={SERVICES[activeIndex].image}
                alt={SERVICES[activeIndex].alt}
                fill
                className="object-cover"
                sizes="360px"
              />
              {/* Red gradient border accent */}
              <div className="absolute inset-0 border border-primary/20 rounded-lg" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ── Section Header ───────────────────────────────────────── */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="mb-16 md:mb-24 lg:mb-32"
        >
          {/* Small label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full animate-pulse-slow" />
            <span className="text-primary text-[9px] md:text-[11px] font-bold tracking-[0.35em] uppercase">
              OUR SERVICES
            </span>
          </div>

          {/* Large heading */}
          <h2 className="font-heading text-white leading-[0.9] tracking-tighter uppercase">
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] xl:text-[8.5rem]">
              WE KNOW WHAT
            </span>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] xl:text-[8.5rem]">
              WE&apos;RE <span className="text-primary">GOOD AT!</span>
            </span>
          </h2>
        </motion.div>

        {/* ── Service List ─────────────────────────────────────────── */}
        <motion.div
          variants={listContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="border-t border-white/10"
        >
          {SERVICES.map((service, idx) => (
            <ServiceItem
              key={service.id}
              service={service}
              index={idx}
              isActive={activeIndex === idx}
              onHoverStart={() => {
                if (typeof window !== "undefined" && window.innerWidth >= 1024) {
                  setActiveIndex(idx);
                }
              }}
              onHoverEnd={() => {
                if (typeof window !== "undefined" && window.innerWidth >= 1024) {
                  setActiveIndex(null);
                }
              }}
              onClick={() => {
                if (typeof window !== "undefined" && window.innerWidth < 1024) {
                  setActiveIndex((prev) => (prev === idx ? null : idx));
                }
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Individual Service Row ────────────────────────────────────────────── */
interface ServiceItemProps {
  service: (typeof SERVICES)[number];
  index: number;
  isActive: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}

function ServiceItem({
  service,
  index,
  isActive,
  onHoverStart,
  onHoverEnd,
  onClick,
}: ServiceItemProps) {
  return (
    <motion.div
      variants={itemVariants}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={onClick}
      className="group border-b border-white/10 cursor-pointer"
    >
      <div className="py-6 md:py-8 lg:py-10 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
        {/* Index number */}
        <span
          className={`
            hidden lg:block text-[11px] font-mono tracking-widest
            transition-colors duration-500 w-12 shrink-0
            ${isActive ? "text-primary" : "text-white/20"}
          `}
        >
          {service.id}
        </span>

        {/* Service title — oversized editorial typography */}
        <motion.h3
          className={`
            font-heading uppercase tracking-tight leading-[0.95]
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]
            transition-colors duration-500 flex-1
            ${isActive ? "text-primary" : "text-white"}
          `}
          animate={{
            x: isActive ? 16 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {service.title}
        </motion.h3>

        {/* Description — appears on hover (desktop) or always visible (mobile) */}
        <div className="lg:w-[280px] xl:w-[320px] shrink-0">
          {/* Mobile: always visible */}
          <p className="lg:hidden text-gray-500 text-[11px] md:text-xs leading-relaxed tracking-wide">
            {service.desc}
          </p>

          {/* Desktop: animate on hover */}
          <AnimatePresence>
            {isActive && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="hidden lg:block text-gray-400 text-xs xl:text-[13px] leading-relaxed tracking-wide"
              >
                {service.desc}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile image preview — appears on tap/active state */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 200 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden relative w-full overflow-hidden rounded-lg"
            >
              <Image
                src={service.image}
                alt={service.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 360px"
              />
              <div className="absolute inset-0 border border-primary/20 rounded-lg" />
            </motion.div>
          )}
        </AnimatePresence>


      </div>
    </motion.div>
  );
}
