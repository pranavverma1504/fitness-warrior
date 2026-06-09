"use client";

import { motion } from "framer-motion";
import { fadeUp, slideInLeft, slideInRight, viewportOnce } from "@/animations/variants";

export default function Contact() {
  return (
    <section id="contact" className="section-padding bg-[#0f0f0f] relative overflow-hidden">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Details / Headline */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-3">Reach Out</p>
            <h2 className="section-title">DO YOU HAVE <span className="text-primary">QUESTIONS?</span></h2>
            <div className="red-line" />
            <p className="section-subtitle mb-10">
              Our expert coaches and dedicated team are here to help you achieve your goals. Visit us today or send us a message.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h4 className="text-white font-heading text-xl uppercase tracking-widest mb-4">Our Location</h4>
                <div className="flex items-start gap-4 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm">Warrior Heights, Performance Blvd, New York, NY 10001</p>
                </div>
              </div>
              <div>
                <h4 className="text-white font-heading text-xl uppercase tracking-widest mb-4">Contact Info</h4>
                <div className="flex items-center gap-4 text-gray-500 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <p className="text-sm">+1 (555) WARRIOR</p>
                </div>
                <div className="flex items-center gap-4 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm">contact@fitnesswarrior.com</p>
                </div>
              </div>
            </div>

            {/* Newsletter mock */}
            <div className="mt-12 p-6 border border-dark-border bg-dark-card/50">
              <h4 className="text-white font-heading text-lg uppercase tracking-widest mb-2 italic">Follow Us</h4>
              <div className="flex gap-4">
                 {["INSTAGRAM", "TWITTER", "YOUTUBE"].map((social) => (
                   <span key={social} className="text-xs font-bold text-primary cursor-pointer hover:text-white transition-colors">{social}</span>
                 ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form UI only */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="card-dark p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-2 h-full bg-primary" />
            <form className="space-y-6 flex flex-col items-center">
              <div className="grid sm:grid-cols-2 gap-6 w-full">
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-400">Full Name</label>
                  <input type="text" className="input-dark w-full px-4 py-3 bg-[#111] border border-gray-800 focus:border-primary outline-none text-white text-sm" placeholder="e.g. John Doe" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-400">Email Address</label>
                  <input type="email" className="input-dark w-full px-4 py-3 bg-[#111] border border-gray-800 focus:border-primary outline-none text-white text-sm" placeholder="john@example.com" />
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label className="text-xs uppercase tracking-widest font-bold text-gray-400">Program Interest</label>
                <select className="input-dark w-full px-4 py-3 bg-[#111] border border-gray-800 focus:border-primary outline-none text-white text-sm appearance-none">
                  <option className="bg-[#111]">Weight Lifting</option>
                  <option className="bg-[#111]">Body Building</option>
                  <option className="bg-[#111]">Cardio / HIIT</option>
                  <option className="bg-[#111]">Fat Loss Focus</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label className="text-xs uppercase tracking-widest font-bold text-gray-400">Message</label>
                <textarea rows={4} className="input-dark w-full px-4 py-3 bg-[#111] border border-gray-800 focus:border-primary outline-none text-white text-sm" placeholder="Tell us about your fitness goals..."></textarea>
              </div>

              <button type="submit" className="btn-primary w-full shadow-lg shadow-primary/20 py-4 uppercase tracking-widest text-xs font-bold transition-all duration-300 transform hover:scale-[1.02]">
                Submit Warrior Quest
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
