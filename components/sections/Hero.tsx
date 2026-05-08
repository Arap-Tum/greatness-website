'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'



import Logo from '../media/Logo'

// import backgroundVideo from 'public/assets/heroVideo.mp4'


export default function Hero( ) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // const smoothX = useSpring(mouseX, { damping: 40, stiffness: 200 })
  // const smoothY = useSpring(mouseY, { damping: 40, stiffness: 200 })


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

      {/* BACKGROUND VIDEO */}
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/assets/heroVideo.mp4" type="video/mp4" />
  </video>

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/60" />

      {/* === LOGO (BLUR REVEAL) === */}
      

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