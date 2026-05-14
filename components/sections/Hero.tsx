'use client'

import { useEffect } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { useBfcacheRefresh } from '@/hooks/useBfcacheRefresh'

export default function Hero() {
  const bfKey = useBfcacheRefresh()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    // key={bfKey} forces a full re-mount when page is restored from bfcache,
    // so all initial → animate sequences fire again cleanly.
    <section
      key={bfKey}
      className="relative min-h-svh flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 overflow-hidden text-center"
    >

      {/* BACKGROUND VIDEO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/assets/heroVideo.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />

      {/* === HEADLINE === */}
      {/* <div className="overflow-hidden relative z-10">
        <motion.h1
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="heading-xl"
        >
          Where Creativity
        </motion.h1>
      </div> */}

      {/* <div className="overflow-hidden relative z-10">
        <motion.h1
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="heading-xl font-semibold"
        >
          Meets Greatness
        </motion.h1>
      </div> */}

      {/* === SUBTEXT === */}
      {/* <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-6 text-soft max-w-md relative z-10"
      >
        We craft bold, high-impact digital experiences for modern brands.
      </motion.p> */}

      {/* === CTA === */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="mt-10 flex flex-wrap justify-center gap-4 relative z-10"
      >
        <a href="/contact" className="btn-primary">Start a Project</a>
        <a href="/work" className="btn-outline">See Our Work</a>
      </motion.div>

      {/* === ANIMATED GRADIENT BAR === */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-16 overflow-hidden rounded-full relative z-10"
      >
        <motion.div
          className="h-2.5 w-60 bg-gradient-primary"
          animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          style={{ backgroundSize: '200% 200%' }}
        />
      </motion.div>

    </section>
  )
}