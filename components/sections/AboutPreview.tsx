'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const stats = [
  { value: '150+', label: 'Projects Delivered' },
  { value: '98%',  label: 'Client Satisfaction' },
  { value: '7+',   label: 'Years of Craft' },
  { value: '40+',  label: 'Global Brands' },
]

const values = [
  {
    symbol: '✦',
    title: 'Bold Creativity',
    desc:  "We don't follow trends — we create them. Every project is a chance to push the boundary of what's possible.",
  },
  {
    symbol: '◈',
    title: 'Strategic Intent',
    desc:  'Design without strategy is decoration. Every visual decision we make is anchored in your brand purpose.',
  },
  {
    symbol: '⬡',
    title: 'Obsessive Craft',
    desc:  'The details are what separate good from great. We sweat every pixel, every word, every interaction.',
  },
  {
    symbol: '↗',
    title: 'Growth Mindset',
    desc:  'We partner with brands for the long game — building identity systems that scale with your ambition.',
  },
]

/* ─────────────────────────────────────────
   ANIMATION HELPERS
───────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial:   { opacity: 0, y: 40 },
  variants: {
    visible: { opacity: 1, y: 0, transition: { delay, duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
    hidden:  { opacity: 0, y: 40 },
  },
})

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function AboutPreview() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const anim   = inView ? 'visible' : 'hidden'

  return (
    <section
      ref={ref}
      className="relative overflow-hidden section-padding"
    >
      {/* ── Ambient background glows ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]
                        bg-[radial-gradient(ellipse,rgba(109,40,255,0.08),transparent_70%)]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px]
                        bg-[radial-gradient(circle,rgba(255,45,160,0.06),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px]
                        bg-[radial-gradient(circle,rgba(255,122,24,0.05),transparent_60%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* ════════════════════════════════
            SECTION HEADER
        ════════════════════════════════ */}
        <div className="text-center mb-20">

          <motion.p
            variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 16 } }}
            initial="hidden"
            animate={anim}
            transition={{ duration: 0.6 }}
            className="text-muted text-xs uppercase tracking-[0.22em] mb-4"
          >
            About Us
          </motion.p>

          <div className="overflow-hidden">
            <motion.h2
              variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: 70, opacity: 0 } }}
              initial="hidden"
              animate={anim}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="heading-lg font-bold"
            >
              Who We Are
            </motion.h2>
          </div>

          {/* Gradient divider — matches the image */}
          <motion.div
            variants={{ visible: { scaleX: 1, opacity: 1 }, hidden: { scaleX: 0, opacity: 0 } }}
            initial="hidden"
            animate={anim}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="divider-gradient mx-auto mt-7 origin-left"
          />
        </div>

        {/* ════════════════════════════════
            MISSION — SPLIT LAYOUT
        ════════════════════════════════ */}
        <div className="grid md:grid-cols-[1fr_1fr] gap-10 lg:gap-16 mb-28 items-center">

          {/* Left: copy */}
          <motion.div
            variants={{ visible: { opacity: 1, x: 0 }, hidden: { opacity: 0, x: -50 } }}
            initial="hidden"
            animate={anim}
            transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="heading-lg font-semibold leading-[1.1] mb-6">
              We turn brands into{' '}
              <span className="text-gradient">bold stories</span>
              {' '}that move people.
            </h3>
            <p className="text-soft leading-relaxed mb-5">
              Greatness Creative Agency is a modern branding and creative solutions agency
              dedicated to helping brands discover, express, and amplify their true identity.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              We exist to bring out the greatness in every brand through intentional
              creativity and strategic design — from first impression to lasting legacy.
            </p>

            {/* Inline CTA link */}
            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-medium group"
              style={{ color: 'rgb(var(--color-text-soft))' }}
            >
              <span
                className="text-gradient font-semibold"
                style={{ transition: 'var(--transition-base)' }}
              >
                Work with us
              </span>
              <span
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                style={{
                  background: 'var(--gradient-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                →
              </span>
            </a>
          </motion.div>

          {/* Right: glass quote card */}
          <motion.div
            variants={{ visible: { opacity: 1, x: 0 }, hidden: { opacity: 0, x: 50 } }}
            initial="hidden"
            animate={anim}
            transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="card-glass p-8 lg:p-10 relative overflow-hidden"
          >
            {/* Corner glow */}
            <div className="absolute -top-10 -right-10 w-56 h-56
                            bg-[radial-gradient(circle,rgba(255,45,160,0.12),transparent_65%)]
                            pointer-events-none" />

            {/* Gradient top border accent */}
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-primary opacity-40" />

            <blockquote className="relative z-10">
              <span
                className="block text-5xl font-bold leading-none mb-3 text-gradient"
                aria-hidden
              >
              &quot;
              </span>
              <p className="text-soft text-base lg:text-lg leading-relaxed mb-8">
                Great design is not just what looks beautiful — it &apos s what works beautifully
                and tells the truth about who you are.
              </p>
              <div className="flex items-center gap-4">
                <div
                  className="w-11 h-11 rounded-full bg-gradient-primary flex items-center
                              justify-center text-xs font-bold text-white shrink-0"
                >
                  GC
                </div>
                <div>
                  <p className="text-sm font-semibold">Creative Director</p>
                  <p className="text-xs text-muted">Greatness Creative Agency</p>
                </div>
              </div>
            </blockquote>
          </motion.div>
        </div>

        {/* ════════════════════════════════
            STATS ROW
        ════════════════════════════════ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-28">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 30 } }}
              initial="hidden"
              animate={anim}
              transition={{ delay: 0.15 + i * 0.09, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="card-glass p-6 text-center relative overflow-hidden group
                         hover:-translate-y-1 transition-all duration-500"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-subtle opacity-0
                              group-hover:opacity-100 transition-opacity duration-500 rounded-[var(--radius-xl)]" />
              <p className="text-gradient text-3xl lg:text-4xl font-bold mb-1 relative z-10">
                {stat.value}
              </p>
              <p className="text-muted text-xs uppercase tracking-widest relative z-10">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ════════════════════════════════
            VALUES GRID
        ════════════════════════════════ */}
        <div className="mb-28">
          <div className="text-center mb-14">
            <motion.p
              variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 16 } }}
              initial="hidden"
              animate={anim}
              transition={{ duration: 0.6 }}
              className="text-muted text-xs uppercase tracking-[0.22em] mb-3"
            >
              Our Foundation
            </motion.p>
            <div className="overflow-hidden">
              <motion.h3
                variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: 60, opacity: 0 } }}
                initial="hidden"
                animate={anim}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="heading-lg font-bold"
              >
                What We{' '}
                <span className="text-gradient">Believe In</span>
              </motion.h3>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 50 } }}
                initial="hidden"
                animate={anim}
                transition={{ delay: 0.08 + i * 0.13, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="card-glass p-7 group hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
              >
                {/* Bottom gradient line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-primary
                                scale-x-0 group-hover:scale-x-100 transition-transform
                                duration-500 origin-left" />

                <div
                  className="text-2xl mb-5 text-gradient font-bold inline-block
                              group-hover:scale-110 transition-transform duration-300"
                >
                  {v.symbol}
                </div>
                <h4 className="font-semibold text-sm tracking-wide mb-3">{v.title}</h4>
                <p className="text-muted text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════
            CTA STRIP
        ════════════════════════════════ */}
        <motion.div
          variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 40 } }}
          initial="hidden"
          animate={anim}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="card-glass p-12 lg:p-16 text-center relative overflow-hidden"
        >
          {/* Subtle gradient fill */}
          <div className="absolute inset-0 bg-gradient-subtle opacity-50 pointer-events-none" />
          {/* Top border accent */}
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-primary opacity-50" />
          {/* Corner orbs */}
          <div className="absolute -top-16 -left-16 w-48 h-48
                          bg-[radial-gradient(circle,rgba(109,40,255,0.12),transparent_65%)]
                          pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-48 h-48
                          bg-[radial-gradient(circle,rgba(255,122,24,0.10),transparent_65%)]
                          pointer-events-none" />

          <div className="relative z-10">
            <p className="text-muted text-xs uppercase tracking-[0.22em] mb-4">
              Ready to grow?
            </p>
            <h3 className="heading-lg font-bold mb-8 max-w-lg mx-auto leading-tight">
              Let's build something
              <span className="text-gradient">great together</span>
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/contact" className="btn-primary">
                Start a Project
              </a>
              <a href="/work" className="btn-outline">
                See Our Work
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}