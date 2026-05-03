'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

/* ─────────────────────────────────────────
   CLIENT DATA — replace logo src with real paths
───────────────────────────────────────── */
const clients = [
  {
    id: 'brookhill',
    name: 'Brookhill Academy',
    category: 'Education',
    tagline: 'School in Tassia, Embakasi',
    // ↓ replace with real logo path e.g. '/logos/brookhill.png'
    logo: null,
    initials: 'BA',
    dot: '#ff7a18',
    projectCount: 3,
  },
  {
    id: 'golden-pasos',
    name: 'The Golden Pasos Centre',
    category: 'Lifestyle',
    tagline: 'Much more than gold',
    logo: null,
    initials: 'GP',
    dot: '#ff2da0',
    projectCount: 2,
  },
  {
    id: 'monvid',
    name: 'Monvid Insurance Agency',
    category: 'Finance',
    tagline: 'Insurance solutions, simplified',
    logo: null,
    initials: 'MI',
    dot: '#6d28ff',
    projectCount: 2,
  },
  {
    id: 'wra',
    name: 'Water Resources Authority',
    category: 'Government',
    tagline: 'Securing Water Resources',
    logo: null,
    initials: 'WRA',
    dot: '#ff7a18',
    projectCount: 1,
  },
]

export default function ShowcasePreview() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const anim   = inView ? 'visible' : 'hidden'

  return (
    <section ref={ref} className="relative overflow-hidden section-padding">

      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px]
                        bg-[radial-gradient(ellipse,rgba(255,45,160,0.06),transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px]
                        bg-[radial-gradient(circle,rgba(109,40,255,0.05),transparent_60%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <div className="overflow-hidden">
            <motion.p
              variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 16 } }}
              initial="hidden" animate={anim}
              transition={{ duration: 0.6 }}
              className="text-muted text-xs uppercase tracking-[0.22em] mb-2"
            >
              Our Impact
            </motion.p>
          </div>
          <div className="overflow-hidden">
            <motion.span
              variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: 60, opacity: 0 } }}
              initial="hidden" animate={anim}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="block heading-lg text-muted font-normal"
            >
              Brands We&epos;ve
            </motion.span>
          </div>
          <div className="overflow-hidden -mt-2">
            <motion.span
              variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: 60, opacity: 0 } }}
              initial="hidden" animate={anim}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="block heading-lg font-bold"
            >
              Worked With
            </motion.span>
          </div>
          <motion.div
            variants={{ visible: { scaleX: 1, opacity: 1 }, hidden: { scaleX: 0, opacity: 0 } }}
            initial="hidden" animate={anim}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="divider-gradient mx-auto mt-6 origin-left"
          />
        </div>

        {/* ── Client logo strip ── */}
        <motion.div
          variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 30 } }}
          initial="hidden" animate={anim}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="card-glass p-8 mb-12 flex flex-wrap items-center justify-center gap-10 md:gap-16"
        >
          {clients.map((c) => (
            <div key={c.id} className="flex flex-col items-center gap-3 group">
              {/* Logo slot — replace null with <Image> when ready */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center
                           border border-white/10 transition-all duration-300
                           group-hover:border-white/20 group-hover:scale-110"
                style={{ background: `radial-gradient(circle at 35% 35%, ${c.dot}33, ${c.dot}11)` }}
              >
                {c.logo ? (
                  // ↓ replace with: <Image src={c.logo} alt={c.name} width={40} height={40} className="object-contain" />
                  <img src={c.logo} alt={c.name} className="w-10 h-10 object-contain" />
                ) : (
                  <span
                    className="text-xs font-bold"
                    style={{
                      background: 'var(--gradient-primary)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {c.initials}
                  </span>
                )}
              </div>
              <span className="text-muted text-xs text-center max-w-[80px] leading-tight">
                {c.name}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ── Preview cards: first 2 clients ── */}
        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          {clients.slice(0, 2).map((c, i) => (
            <motion.div
              key={c.id}
              variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 40 } }}
              initial="hidden" animate={anim}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="card-glass p-7 relative overflow-hidden group hover:-translate-y-1
                         transition-all duration-500"
            >
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-primary
                              scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center
                             border border-white/10 shrink-0"
                  style={{ background: `radial-gradient(circle at 35% 35%, ${c.dot}33, ${c.dot}11)` }}
                >
                  <span
                    className="text-xs font-bold"
                    style={{
                      background: 'var(--gradient-primary)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {c.initials}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-sm">{c.name}</p>
                  <p className="text-muted text-xs">{c.category} · {c.projectCount} Projects</p>
                </div>
              </div>

              {/* Media thumbnail placeholder — 16:9 */}
              <div
                className="w-full aspect-video rounded-[var(--radius-lg)] flex items-center
                           justify-center border border-white/05 mb-4"
                style={{ background: `linear-gradient(135deg, ${c.dot}18, ${c.dot}05)` }}
              >
                {/* ↓ REPLACE with real thumbnail:
                    <Image src="/projects/brookhill-thumb.jpg" alt="..." fill className="object-cover rounded-[var(--radius-lg)]" />
                */}
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-white/08 flex items-center
                                  justify-center mx-auto mb-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 4l6 4-6 4V4z" fill="rgba(255,255,255,0.4)" />
                    </svg>
                  </div>
                  <p className="text-muted text-xs">Project thumbnail goes here</p>
                </div>
              </div>

              <p className="text-muted text-xs italic">{c.tagline}</p>
            </motion.div>
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 20 } }}
          initial="hidden" animate={anim}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="text-center"
        >
          <Link href="/showCase" className="btn-primary inline-block">
            View Full Showcase
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
