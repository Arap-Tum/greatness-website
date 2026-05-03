'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

/* ─── Preview services (top 4 only) ─── */
const featured = {
  dot: 'bg-gradient-primary',
  title: 'Social Media Management',
  desc: 'We manage your social media through strategy, content planning, posting, engagement, and performance tracking to drive consistent growth.',
  accent: true,
}

const previews = [
  {
    dot: '#ff7a18',
    title: 'Branding & Websites',
    desc: 'We design strong brand identities and build clean, user-friendly websites that enhance your brand presence.',
  },
  {
    dot: '#ff2da0',
    title: 'SEO & Paid Advertising',
    desc: 'We optimise your online presence and run targeted ads to increase visibility, traffic, and lead generation.',
  },
  {
    dot: '#6d28ff',
    title: 'Graphic Design',
    desc: 'We design professional and visually engaging materials, including social media graphics, posters, and marketing assets.',
  },
]

export default function ServicesPreview() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const anim   = inView ? 'visible' : 'hidden'

  return (
    <section ref={ref} className="relative overflow-hidden section-padding">

      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px]
                        bg-[radial-gradient(ellipse,rgba(109,40,255,0.07),transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px]
                        bg-[radial-gradient(circle,rgba(255,45,160,0.05),transparent_60%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <div className="overflow-hidden">
            <motion.p
              variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 20 } }}
              initial="hidden" animate={anim}
              transition={{ duration: 0.7 }}
              className="text-muted text-xs uppercase tracking-[0.22em] mb-2"
            >
              What We Do
            </motion.p>
          </div>

          <div className="overflow-hidden">
            <motion.span
              variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: 60, opacity: 0 } }}
              initial="hidden" animate={anim}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="block heading-lg text-muted font-normal"
            >
              Our
            </motion.span>
          </div>

          <div className="overflow-hidden -mt-2">
            <motion.span
              variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: 60, opacity: 0 } }}
              initial="hidden" animate={anim}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="block heading-lg font-bold"
            >
              Services
            </motion.span>
          </div>

          <motion.div
            variants={{ visible: { scaleX: 1, opacity: 1 }, hidden: { scaleX: 0, opacity: 0 } }}
            initial="hidden" animate={anim}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="divider-gradient mx-auto mt-6 origin-left"
          />
        </div>

        {/* ── Cards row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">

          {/* Featured card — gradient fill */}
          <motion.div
            variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 50 } }}
            initial="hidden" animate={anim}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[var(--radius-xl)] p-7 flex flex-col
                       group hover:-translate-y-2 transition-all duration-500"
            style={{ background: 'var(--gradient-primary)' }}
          >
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100
                            transition-opacity duration-500" />
            <div className="w-3 h-3 rounded-full bg-white/30 mb-auto" />
            <div className="mt-16">
              <h3 className="font-bold text-lg text-white leading-snug mb-3">
                {featured.title}
              </h3>
              <p className="text-white/75 text-sm leading-relaxed">{featured.desc}</p>
            </div>
          </motion.div>

          {/* Regular cards */}
          {previews.map((s, i) => (
            <motion.div
              key={s.title}
              variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 50 } }}
              initial="hidden" animate={anim}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="card-glass p-7 flex flex-col group hover:-translate-y-2
                         transition-all duration-500 relative overflow-hidden"
            >
              {/* hover bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-primary
                              scale-x-0 group-hover:scale-x-100 transition-transform
                              duration-500 origin-left" />
              {/* dot icon */}
              <div
                className="w-11 h-11 rounded-full mb-auto shrink-0"
                style={{ background: `radial-gradient(circle at 35% 35%, ${s.dot}, ${s.dot}99)` }}
              />
              <div className="mt-10">
                <h3 className="font-bold text-base leading-snug mb-3">{s.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 20 } }}
          initial="hidden" animate={anim}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center"
        >
          <Link href="/services" className="btn-primary inline-block">
            View All Services
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
