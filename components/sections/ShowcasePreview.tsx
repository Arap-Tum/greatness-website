'use client'



import { motion, useInView } from 'framer-motion'


import { useRef } from 'react'

export default function ShowcasePreview() {
  
   const ref    = useRef<HTMLElement>(null)
   const inView = useInView(ref, { once: true, margin: '-80px' })
   const anim   = inView ? 'visible' : 'hidden'
  return (
       <main
          data-theme="lifted"
         className="bg-[rgb(var(--color-bg))]"
        >
    
          {/* ─── Hero ─── */}
          <section className="section-padding relative overflow-hidden pb-8">
    
            {/* Ambient glow blobs */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, rgba(109,40,255,0.5) 0%, transparent 70%)' }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 right-10 w-[300px] h-[300px] rounded-full opacity-15"
              style={{ background: 'radial-gradient(circle, rgba(255,45,160,0.5) 0%, transparent 70%)' }}
            />
    
            <div className="relative z-10 max-w-3xl">
              {/* Gradient pill label */}
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04]">
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-primary" style={{ background: 'var(--gradient-primary)' }} />
                <span className="text-xs font-medium tracking-widest uppercase text-muted">Selected Works</span>
              </div>
    
              <h1 className="heading-xl font-semibold tracking-tight mb-5">
                Our{' '}
                <span className="text-gradient">Showcase</span>
              </h1>
    
              {/* Divider bar */}
              <div className="divider-gradient mb-6" />
    
              <p className="text-[clamp(1rem,1.4vw,1.15rem)] text-muted leading-relaxed max-w-xl">
                A curated collection of brands and projects we have had the privilege of shaping — from
                early concepts to polished, launch-ready deliverables.
              </p>
            </div>

<div className="mt-10 flex flex-wrap items-center gap-4">
  <a
    href="/showcase"
    className="
      inline-flex items-center justify-center
      rounded-xl
      px-6 py-3
      text-sm font-medium
      transition-all duration-300
      bg-white text-black
      hover:scale-[1.02]
    "
  >
    Explore Showcase
  </a>

  <a
    href="/contact"
    className="
      inline-flex items-center justify-center
      rounded-xl
      border border-white/10
      bg-white/[0.03]
      px-6 py-3
      text-sm font-medium
      backdrop-blur-xl
      transition-all duration-300
      hover:bg-white/[0.06]
    "
  >
    Start a Project
  </a>
</div>
          </section>
    
      
 
    
        </main>
  )
}