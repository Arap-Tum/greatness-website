'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'

export default function Hero() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 200 })
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 200 })


 useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])   // ✅ declare stable deps


  return (
    <section className="relative min-h-svh flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 overflow-hidden text-center">

      {/* === CURSOR GLOW (ELITE EFFECT) === */}
      {/* Cursor glow — always rendered; 'use client' means no SSR mismatch */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2
                   w-125 h-125 rounded-full blur-[120px] opacity-20"
      >
        <div className="w-full h-full bg-gradient-primary" />
      </motion.div>

      {/* STATIC BACKGROUND DEPTH */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,45,160,0.06),transparent_60%)]" />

      {/* === LOGO (BLUR REVEAL) === */}
      <motion.div
        initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1 }}
        className="mb-12"
      >
        {/* Replace with your actual logo */}
        <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-xs text-muted backdrop-blur-md">
          LOGO
        </div>
      </motion.div>

      {/* === HEADLINE (CINEMATIC SPLIT) === */}
      <div className="overflow-hidden">
        <motion.h1
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="heading-xl"
        >
          Where Creativity
        </motion.h1>
      </div>

      <div className="overflow-hidden">
        <motion.h1
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="heading-xl font-semibold"
        >
          Meets Greatness
        </motion.h1>
      </div>

      {/* === SUBTEXT === */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-6 text-soft max-w-md"
      >
        We craft bold, high-impact digital experiences for modern brands.
      </motion.p>

      {/* === CTA === */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="mt-10 flex flex-wrap justify-center gap-4"
      >
   <div className="flex flex-wrap justify-center gap-4">
              <a href="/contact" className="btn-primary">
                Start a Project
              </a>
              <a href="/work" className="btn-outline">
                See Our Work
              </a>
            </div>
      </motion.div>

      {/* === ANIMATED GRADIENT BAR === */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-16 overflow-hidden rounded-full"
      >
        <motion.div
          className="h-2.5 w-60 bg-gradient-primary"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundSize: '200% 200%',
          }}
        />
      </motion.div>

    </section>
  )
}