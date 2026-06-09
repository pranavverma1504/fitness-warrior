"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { triggerLiquidTransition } from "./LiquidMaskTransition";

const navLinks = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "SERVICES", href: "#programs" },
  { label: "PRICING", href: "#pricing" },
  { label: "LOCATIONS", href: "#locations" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSectionRef = useRef<string>("#home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Mapping section IDs to their corresponding navigation HREFs
    const sectionToHref: Record<string, string> = {
      "home": "#home",
      "about": "#about",
      "programs": "#programs",
      "pricing": "#pricing",
      "locations": "#locations",
      "footer": "#footer"
    };

    const observers: IntersectionObserver[] = [];

    Object.keys(sectionToHref).forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            activeSectionRef.current = sectionToHref[id];
          }
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    // Prevent re-navigation if already on the active section
    if (activeSectionRef.current === href) return;
    
    // Get click coordinates for liquid transition
    const isMouse = 'clientX' in e;
    const clientX = isMouse ? (e as any).clientX : window.innerWidth / 2;
    const clientY = isMouse ? (e as any).clientY : window.innerHeight / 2;
    
    // Immediately update active section to prevent double clicks during transition
    activeSectionRef.current = href;
    
    triggerLiquidTransition(href, clientX, clientY);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLElement>,
    href: string
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      handleNavClick(e, href);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 flex items-stretch border-b border-white/5 transition-all duration-500 ${
          scrolled ? "bg-black/95 backdrop-blur-md" : "bg-transparent"
        }`}
        style={{ height: "70px" }}
      >
        {/* Logo */}
        <div
          role="link"
          tabIndex={0}
          aria-label="Fitness Warrior Home"
          className="flex items-center px-6 md:px-10 border-r border-white/10 bg-black/20 group cursor-pointer transition-all outline-none focus-visible:bg-white/5"
          onClick={(e) => handleNavClick(e, "#home")}
          onKeyDown={(e) => handleKeyDown(e, "#home")}
        >
          <div className="flex items-center gap-2 md:gap-3">
            <Image
              src="/logo.webp"
              alt="Fitness Warrior Logo"
              width={32}
              height={16}
              priority
              className="h-[16px] md:h-[20px] w-auto object-contain"
            />
            <span className="font-heading text-lg md:text-xl tracking-[0.15em] md:tracking-[0.2em] text-white">
              FITNESS WARRIOR
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex flex-1 items-center px-4 lg:px-8 gap-4 lg:gap-8">
          {navLinks.map((link) => (
            <span
              key={link.label}
              role="button"
              tabIndex={0}
              onClick={(e) => handleNavClick(e, link.href)}
              onKeyDown={(e) => handleKeyDown(e, link.href)}
              className="text-[8px] lg:text-[9px] font-bold tracking-[0.2em] lg:tracking-[0.25em] text-gray-400 hover:text-white transition-colors duration-200 whitespace-nowrap cursor-pointer outline-none focus-visible:text-white"
            >
              {link.label}
            </span>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden flex-1 justify-end items-center px-6">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            className="flex flex-col gap-1.5 p-2 group outline-none focus-visible:bg-white/10 rounded"
          >
            <motion.div 
              animate={isMobileMenuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
              className="w-6 h-[1.5px] bg-white group-hover:bg-primary transition-colors"
            />
            <motion.div 
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-[1.5px] bg-white group-hover:bg-primary transition-colors"
            />
            <motion.div 
              animate={isMobileMenuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
              className="w-6 h-[1.5px] bg-white group-hover:bg-primary transition-colors"
            />
          </button>
        </div>

        {/* Contact Us (Desktop) */}
        <div className="hidden lg:flex items-center px-10 border-l border-white/10">
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => handleNavClick(e, "#footer")}
            onKeyDown={(e) => handleKeyDown(e, "#footer")}
            className="text-[9px] font-bold tracking-[0.2em] text-white hover:text-primary transition-colors cursor-pointer outline-none focus-visible:text-primary"
          >
            CONTACT US
          </span>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[49] bg-black flex flex-col pt-[70px] px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 mt-12">
              {navLinks.map((link, idx) => (
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={link.label}
                  role="button"
                  tabIndex={0}
                  onClick={(e) => handleNavClick(e, link.href)}
                  onKeyDown={(e) => handleKeyDown(e, link.href)}
                  className="text-4xl font-heading text-white tracking-widest uppercase hover:text-primary transition-colors cursor-pointer outline-none focus-visible:text-primary"
                >
                  {link.label}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                role="button"
                tabIndex={0}
                onClick={(e) => handleNavClick(e, "#footer")}
                onKeyDown={(e) => handleKeyDown(e, "#footer")}
                className="text-4xl font-heading text-primary tracking-widest uppercase mt-8 cursor-pointer outline-none focus-visible:text-white"
              >
                CONTACT US
              </motion.span>
            </div>
            
            {/* HUD Decorative Element for menu */}
            <div className="mt-auto mb-12 border-t border-white/10 pt-8">
              <span className="text-[10px] text-gray-500 tracking-[0.4em] uppercase">Status: System Operational</span>
              <div className="flex gap-4 mt-4 opacity-30">
                <div className="w-12 h-1 bg-white/20" />
                <div className="w-4 h-1 bg-primary" />
                <div className="w-20 h-1 bg-white/20" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
