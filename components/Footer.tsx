"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/animations/variants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-black py-10 md:py-14 border-t border-dark-border relative overflow-hidden px-6 md:px-0">
      <div className="container-max">
        <motion.div
           variants={fadeUp}
           initial="hidden"
           whileInView="visible"
           viewport={viewportOnce}
           className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-16"
        >
          {/* Brand Info */}
          <div className="md:col-span-2">
            <h4 className="font-heading text-4xl md:text-5xl tracking-widest text-white uppercase mb-4">Fitness <span className="text-primary">Warrior</span></h4>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md italic font-light">
              Everything You Need for a Better Workout Experience. From modern machines and certified trainers to a clean and energetic environment, we&apos;ve created the perfect place to achieve your fitness goals.
            </p>
          </div>

          {/* Socials */}
          <div className="flex flex-col">
            <h6 className="text-white font-bold text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] mb-4 md:mb-6 border-l-2 border-primary pl-4">Socials</h6>
            <ul className="space-y-3">
               <li><a href="https://instagram.com/fitnesswarriorbhilai" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white text-xs uppercase tracking-widest transition-all duration-300 font-medium hover:translate-x-2 inline-block">Instagram: @fitnesswarriorbhilai</a></li>
            </ul>
          </div>

          {/* Support / Contact */}
          <div className="flex flex-col">
            <h6 className="text-white font-bold text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] mb-4 md:mb-6 border-l-2 border-primary pl-4">Contact Us</h6>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-500 text-sm font-bold transition-all duration-300">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" /> +91 91311 07722
              </li>
            </ul>
          </div>
        </motion.div>

        <div className="mt-8 md:mt-10 pt-4 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-gray-600 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-center md:text-left">
             &copy; {currentYear} Fitness Warrior. All Rights Reserved.
           </p>
           <div className="flex flex-col items-center md:items-end gap-1">
             <p className="text-gray-700 text-[8px] uppercase tracking-[0.15em] font-medium italic">
               Designed for Excellence in Bhilai
             </p>
             <p className="text-primary/70 text-[7px] uppercase tracking-[0.2em] font-bold">
               by @pranav.verma_1502
             </p>
           </div>
        </div>
      </div>

       {/* Decorative text - Scaled down for mobile */}
       <div className="absolute -bottom-4 md:-bottom-8 -right-4 md:-right-8 pointer-events-none opacity-[0.03] select-none">
          <span className="text-[100px] md:text-[200px] font-heading font-black tracking-tighter uppercase whitespace-pre leading-none text-white">WARRIOR</span>
       </div>
    </footer>
  );
}
