"use client"

import { useState, useEffect, useRef } from "react"

export default function SmoothFollower() {
  const [mounted, setMounted] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  
  const mousePosition = useRef({ x: 0, y: 0 })
  const dotPosition = useRef({ x: 0, y: 0 })
  const borderDotPosition = useRef({ x: 0, y: 0 })

  const dotRef = useRef<HTMLDivElement>(null)
  const borderDotRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const DOT_SMOOTHNESS = 0.2
  const BORDER_DOT_SMOOTHNESS = 0.1

  useEffect(() => {
    const checkIsDesktop = () => window.innerWidth >= 1024

    const updateDesktop = () => {
      const desktop = checkIsDesktop()
      setIsDesktop(desktop)
      if (!desktop) {
        document.body.style.cursor = "auto"
      }
    }

    updateDesktop()
    setMounted(true)

    window.addEventListener("resize", updateDesktop)
    return () => {
      window.removeEventListener("resize", updateDesktop)
    }
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    let animId: number;
    let isAnimating = false;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const animate = () => {
      dotPosition.current.x = lerp(dotPosition.current.x, mousePosition.current.x, DOT_SMOOTHNESS)
      dotPosition.current.y = lerp(dotPosition.current.y, mousePosition.current.y, DOT_SMOOTHNESS)

      borderDotPosition.current.x = lerp(borderDotPosition.current.x, mousePosition.current.x, BORDER_DOT_SMOOTHNESS)
      borderDotPosition.current.y = lerp(borderDotPosition.current.y, mousePosition.current.y, BORDER_DOT_SMOOTHNESS)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPosition.current.x}px, ${dotPosition.current.y}px, 0) translate(-50%, -50%)`
      }
      if (borderDotRef.current) {
        borderDotRef.current.style.transform = `translate3d(${borderDotPosition.current.x}px, ${borderDotPosition.current.y}px, 0) translate(-50%, -50%)`
      }

      const distDot = Math.hypot(mousePosition.current.x - dotPosition.current.x, mousePosition.current.y - dotPosition.current.y)
      const distBorder = Math.hypot(mousePosition.current.x - borderDotPosition.current.x, mousePosition.current.y - borderDotPosition.current.y)

      if (distDot > 0.1 || distBorder > 0.1) {
        animId = requestAnimationFrame(animate)
      } else {
        isAnimating = false
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }

      const target = e.target as HTMLElement
      if (target && typeof target.closest === "function") {
        const isInside = !!target.closest("#about, #services, #programs")
        
        if (containerRef.current) {
          containerRef.current.style.opacity = isInside ? "1" : "0"
        }
        
        if (isInside) {
          document.body.style.cursor = "none"
        } else {
          document.body.style.cursor = "auto"
        }
      }

      if (!isAnimating) {
        isAnimating = true
        animId = requestAnimationFrame(animate)
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target && typeof target.closest === "function") {
        if (target.closest("a, button, img, input, textarea, select, [role='button']")) {
          if (borderDotRef.current) {
            borderDotRef.current.style.width = "44px"
            borderDotRef.current.style.height = "44px"
          }
        }
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target && typeof target.closest === "function") {
        if (target.closest("a, button, img, input, textarea, select, [role='button']")) {
          if (borderDotRef.current) {
            borderDotRef.current.style.width = "28px"
            borderDotRef.current.style.height = "28px"
          }
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mouseover", handleMouseOver, { passive: true })
    window.addEventListener("mouseout", handleMouseOut, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
      window.removeEventListener("mouseout", handleMouseOut)
      cancelAnimationFrame(animId)
      document.body.style.cursor = "auto"
    }
  }, [isDesktop])

  if (!mounted || !isDesktop) return null

  return (
    <div 
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[10000] opacity-0 transition-opacity duration-200"
    >
      <div
        ref={dotRef}
        className="absolute rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] will-change-transform"
        style={{
          width: "6px",
          height: "6px",
          left: 0,
          top: 0
        }}
      />

      <div
        ref={borderDotRef}
        className="absolute rounded-full border border-white/80 will-change-transform"
        style={{
          width: "28px",
          height: "28px",
          left: 0,
          top: 0,
          transition: "width 0.3s, height 0.3s"
        }}
      />
    </div>
  )
}
