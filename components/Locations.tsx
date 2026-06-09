"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const LOCATIONS = [
  {
    id: 1,
    name: "Kailash Nagar Branch",
    address: "Ekta Chowk Road, in front of Unique Furniture, Kailash Nagar, I/E, Bhilai",
    city: "Chhattisgarh 490026",
  },
  {
    id: 2,
    name: "Ram Nagar Branch",
    address: "Post Office Road, opposite Hanuman Mandir, Supela, Bhilai",
    city: "Chhattisgarh 490023",
  },
  {
    id: 3,
    name: "Smriti Nagar Branch",
    address: "Above ICICI Bank, Near Bharat Petroleum, Smriti Nagar, Bhilai",
    city: "Chhattisgarh",
  },
  {
    id: 4,
    name: "Nehru Nagar West Branch",
    address: "Street No. 9, in front of 90s Cafe, Vidya Vihar Colony, Nehru Nagar West",
    city: "Bhilai, Chhattisgarh 490020",
  },
];

export default function Locations() {
  return (
    <section id="locations" className="bg-black overflow-hidden">
      {/* ── Heading area — plain black, above the image ── */}
      <div className="text-center pt-24 pb-14 md:pt-28 md:pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-5"
        >
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          <span className="text-primary text-[9px] md:text-[10px] font-bold tracking-[0.35em] uppercase">
            Find Us
          </span>
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading text-5xl sm:text-6xl md:text-[7rem] lg:text-[8rem] text-white leading-[0.85] tracking-tighter uppercase"
        >
          <span className="sr-only">Our Gym Locations in Bhilai - </span>
          Our <span className="text-primary">Locations</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-500 text-[10px] md:text-xs tracking-[0.25em] uppercase max-w-lg mx-auto leading-relaxed mt-5"
        >
          4 branches across Bhilai — find the one nearest to you.
        </motion.p>
      </div>

      {/* ── Image + Cards area ── */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: "85vh" }}>
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/location_bg.webp"
            alt="Fitness Warrior Gym Location"
            fill
            className="object-cover object-top"
            sizes="100vw"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50" />
          {/* Gradient fade at top & bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
          {/* Subtle red brand glow */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full blur-3xl pointer-events-none opacity-[0.08]"
            style={{ background: "radial-gradient(ellipse, #c1121f 0%, transparent 70%)" }}
          />
        </div>

        {/* Cards Grid */}
        <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 px-4 md:px-8 py-24 md:py-32 lg:py-40">
          {LOCATIONS.map((loc, i) => {
            const fromLeft = i % 2 === 0;

            return (
              <motion.div
                key={loc.id}
                initial={{ opacity: 0, x: fromLeft ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="relative rounded-2xl overflow-hidden border border-white/10 hover:border-primary/40 transition-all duration-500 group"
                style={{
                  background: "rgba(11, 11, 11, 0.8)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}
              >
                {/* Top accent on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="p-6 md:p-8">
                  {/* Branch label */}
                  <div className="text-primary text-[9px] md:text-xs font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase mb-3 md:mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                    BASE 0{i + 1}
                  </div>

                  {/* Branch name */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-heading uppercase mb-4 md:mb-5 group-hover:tracking-wider transition-all duration-700">
                    {loc.name}
                  </h3>

                  {/* Address */}
                  <div className="text-white/40 text-[10px] md:text-xs lg:text-sm tracking-[0.1em] font-light leading-relaxed uppercase">
                    <p className="border-l border-primary/30 pl-3 md:pl-4">
                      {loc.address}
                    </p>
                    <p className="mt-1 md:mt-2 text-white/60 pl-3 md:pl-4 font-bold">
                      {loc.city}
                    </p>
                  </div>
                </div>

                {/* HUD corner accent */}
                <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 border-t-[1px] border-r-[1px] border-white/5 m-2 opacity-50" />
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
