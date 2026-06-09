"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollFloat({ children, className = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const chars = containerRef.current.querySelectorAll(".char");

    const anim = gsap.fromTo(
      chars,
      {
        yPercent: 100,
        scaleX: 0.8,
        scaleY: 0.8,
        opacity: 0,
      },
      {
        yPercent: 0,
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "bottom 40%",
          scrub: 1,
        },
      }
    );

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
    };
  }, []);

  const splitText = (text) => {
    return text.split("").map((char, index) => (
      <span key={index} className="char">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className={`scroll-float ${className}`}>
      <style>{`
        .scroll-float { overflow: hidden; display: inline-block; }
        .char { display: inline-block; }
      `}</style>
      {typeof children === "string" ? splitText(children) : children}
    </div>
  );
}
