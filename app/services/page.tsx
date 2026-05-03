'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const categories = ['All', 'Branding', 'Digital', 'Content', 'Growth']

const services = [
  {
    id: 1,
    category: 'Branding',
    dot: '#ff7a18',
    featured: false,
    tag: 'Foundation',
    title: 'Branding & Identity',
    short: 'Build a brand that people remember and trust.',
    desc: `We craft complete brand identities from the ground up — logo design, color systems, typography, brand voice, and usage guidelines. Whether you're launching or rebranding, we give your business a face that speaks before you do.',
    deliverables: ['Logo & Symbol System', 'Brand Color Palette', 'Typography Suite', 'Brand Guidelines PDF', 'Business Card & Stationery']`,
  },
  {
    id: 2,
    category: 'Branding',
    dot: '#ff2da0',
    featured: false,
    tag: 'Web',
    title: 'Website Design & Development',
    short: 'Clean, fast, conversion-ready websites.',
    desc: 'We design and build modern websites that look exceptional and perform. From portfolio sites to multi-page business platforms — built on Next.js, fully responsive, SEO-ready, and optimised for speed.',
    deliverables: ['UI/UX Design', 'Responsive Development', 'CMS Integration', 'SEO Foundation', 'Performance Optimisation'],
  },
  {
    id: 3,
    category: 'Digital',
    dot: '#6d28ff',
    featured: false,
    tag: 'Visibility',
    title: 'SEO & Paid Advertising',
    short: 'Get found. Get clicks. Get customers.',
    desc: 'We optimise your online presence through technical and on-page SEO, while running targeted paid ad campaigns on Google and Meta. Every decision is data-driven to maximise your ROI.',
    deliverables: ['SEO Audit & Strategy', 'Keyword Research', 'Google Ads Management', 'Meta Ads Management', 'Monthly Reporting'],
  },
  {
    id: 4,
    category: 'Content',
    dot: '#ff7a18',
    featured: true,          // full gradient card
    tag: 'Most Popular',
    title: 'Social Media Management',
    short: 'Consistent, strategic, scroll-stopping content.',
    desc: 'We take full ownership of your social media presence — content strategy, post creation, scheduling, community engagement, and analytics. You focus on your business; we grow your audience.',
    deliverables: ['Monthly Content Calendar', 'Post Design & Copywriting', 'Daily/Weekly Posting', 'Engagement & DM Management', 'Performance Analytics'],
  },
  {
    id: 5,
    category: 'Content',
    dot: '#ff2da0',
    featured: false,
    tag: 'Creative',
    title: 'Content Creation',
    short: 'High-quality visuals and copy that communicate your brand.',
    desc: 'From photography direction and videography to graphic assets and written content — we create everything your brand needs to show up professionally across every channel.',
    deliverables: ['Photo & Video Direction', 'Graphic Asset Design', 'Copywriting & Scripts', 'Reels & Short-Form Video', 'Blog & Article Writing'],
  },
  {
    id: 6,
    category: 'Branding',
    dot: '#6d28ff',
    featured: false,
    tag: 'Print & Digital',
    title: 'Graphic Design',
    short: 'Visuals that communicate, persuade, and inspire.',
    desc: 'We design professional and visually engaging materials — social media graphics, posters, banners, pitch decks, flyers, and marketing assets — all aligned to your brand identity.',
    deliverables: ['Social Media Templates', 'Poster & Flyer Design', 'Presentation Design', 'Print-Ready Files', 'Brand Asset Library'],
  },
  {
    id: 7,
    category: 'Growth',
    dot: '#ff7a18',
    featured: false,
    tag: 'Partnerships',
    title: 'Influencer Marketing',
    short: 'Reach the right audience through trusted voices.',
    desc: 'We connect your brand with relevant influencers, handle negotiations and collaborations, coordinate content creation, and track performance — so you get authentic reach without the hassle.',
    deliverables: ['Influencer Research & Vetting', 'Outreach & Negotiation', 'Brief & Creative Direction', 'Campaign Coordination', 'Performance Tracking'],
  },
  {
    id: 8,
    category: 'Growth',
    dot: '#ff2da0',
    featured: false,
    tag: 'Strategy',
    title: 'Campaign Management',
    short: 'Full-funnel campaigns built to convert.',
    desc: 'We plan and execute targeted marketing campaigns with clear objectives, creative assets, and strategic distribution across channels. From concept to analytics — we manage the whole journey.',
    deliverables: ['Campaign Strategy & Brief', 'Creative Production', 'Multi-Channel Distribution', 'A/B Testing', 'End-of-Campaign Report'],
  },
]

/* ─────────────────────────────────────────
   SERVICE CARD
───────────────────────────────────────── */
function ServiceCard({ s, index, inView }: { s: typeof services[0]; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false)
  const anim = inView ? 'visible' : 'hidden'

  if (s.featured) {
    return (
      <motion.div
        variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 50 } }}
        initial="hidden"
        animate={anim}
        transition={{ delay: 0.05 + index * 0.07, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[var(--radius-xl)] p-8 flex flex-col
                   group cursor-pointer"
        style={{ background: 'var(--gradient-primary)' }}
        onClick={() => setOpen(!open)}
      >
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Tag */}
        <div className="flex items-center justify-between mb-auto">
          <span className="text-xs font-semibold bg-white/20 text-white px-3 py-1 rounded-full">
            {s.tag}
          </span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-white/60 text-xl leading-none"
          >
            +
          </motion.span>
        </div>

        <div className="mt-10">
          <h3 className="font-bold text-xl text-white leading-snug mb-3">{s.title}</h3>
          <p className="text-white/75 text-sm leading-relaxed mb-4">{s.short}</p>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p className="text-white/65 text-sm leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-1.5">
                  {(s.deliverables || []).map(d => (
                    <li key={d} className="flex items-center gap-2 text-white/80 text-xs">
                      <span className="text-white/40">✦</span> {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 50 } }}
      initial="hidden"
      animate={anim}
      transition={{ delay: 0.05 + index * 0.07, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="card-glass p-7 flex flex-col group hover:-translate-y-1 transition-all
                 duration-500 relative overflow-hidden cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      {/* Bottom gradient accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-primary
                      scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      {/* Tag + toggle */}
      <div className="flex items-center justify-between mb-auto">
        <span className="text-xs text-muted border border-white/10 px-3 py-1 rounded-full">
          {s.tag}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-muted text-xl leading-none"
        >
          +
        </motion.span>
      </div>

      {/* Dot */}
      <div
        className="w-10 h-10 rounded-full mt-6 mb-5 shrink-0
                   group-hover:scale-110 transition-transform duration-300"
        style={{ background: `radial-gradient(circle at 35% 35%, ${s.dot}, ${s.dot}99)` }}
      />

      <h3 className="font-bold text-base leading-snug mb-2">{s.title}</h3>
      <p className="text-muted text-sm leading-relaxed mb-3">{s.short}</p>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-muted text-sm leading-relaxed mb-4 pt-1">{s.desc}</p>
            <ul className="space-y-1.5">
              {(s.deliverables || []).map(d => (
                <li key={d} className="flex items-center gap-2 text-muted text-xs">
                  <span
                    className="text-gradient text-xs"
                    style={{
                      background: 'var(--gradient-primary)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    ✦
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function ServicesPage() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const anim   = inView ? 'visible' : 'hidden'

  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? services : services.filter(s => s.category === active)

  return (
    <main ref={ref} className="relative overflow-hidden min-h-screen">

      {/* ── Ambient glows ── */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px]
                        bg-[radial-gradient(ellipse,rgba(109,40,255,0.07),transparent_65%)]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px]
                        bg-[radial-gradient(circle,rgba(255,45,160,0.05),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px]
                        bg-[radial-gradient(circle,rgba(255,122,24,0.04),transparent_60%)]" />
      </div>

      <div className="section-padding max-w-6xl mx-auto">

        {/* ════════════════════════════════
            HERO HEADER
        ════════════════════════════════ */}
        <div className="text-center mb-6">
          <div className="overflow-hidden">
            <motion.p
              variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 16 } }}
              initial="hidden" animate={anim}
              transition={{ duration: 0.6 }}
              className="text-muted text-xs uppercase tracking-[0.22em] mb-2"
            >
              What We Do
            </motion.p>
          </div>
          <div className="overflow-hidden">
            <motion.span
              variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: 70, opacity: 0 } }}
              initial="hidden" animate={anim}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="block heading-lg text-muted font-normal"
            >
              Our
            </motion.span>
          </div>
          <div className="overflow-hidden -mt-2">
            <motion.span
              variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: 70, opacity: 0 } }}
              initial="hidden" animate={anim}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="block heading-lg font-bold"
            >
              Services
            </motion.span>
          </div>

          <motion.div
            variants={{ visible: { scaleX: 1, opacity: 1 }, hidden: { scaleX: 0, opacity: 0 } }}
            initial="hidden" animate={anim}
            transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="divider-gradient mx-auto mt-6 origin-left"
          />

          <motion.p
            variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 20 } }}
            initial="hidden" animate={anim}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-muted max-w-xl mx-auto mt-7 text-sm leading-relaxed"
          >
            From brand identity to digital growth — every service we offer is built to
            move your brand forward with intention.
          </motion.p>
        </div>

        {/* ════════════════════════════════
            FILTER TABS
        ════════════════════════════════ */}
        <motion.div
          variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 20 } }}
          initial="hidden" animate={anim}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="text-sm px-5 py-2 rounded-full border transition-all duration-300"
              style={{
                borderColor: active === cat ? 'transparent' : 'rgba(255,255,255,0.1)',
                background:  active === cat ? 'var(--gradient-primary)' : 'rgba(255,255,255,0.03)',
                color:       active === cat ? '#fff' : 'rgb(var(--color-muted))',
                fontWeight:  active === cat ? '600' : '400',
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ════════════════════════════════
            SERVICES GRID
        ════════════════════════════════ */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-24"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((s, i) => (
              <ServiceCard key={s.id} s={s} index={i} inView={inView} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ════════════════════════════════
            PROCESS STRIP
        ════════════════════════════════ */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <motion.p
              variants={{ visible: { opacity: 1 }, hidden: { opacity: 0 } }}
              initial="hidden" animate={anim}
              transition={{ delay: 0.2 }}
              className="text-muted text-xs uppercase tracking-[0.22em] mb-3"
            >
              How We Work
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: 50, opacity: 0 } }}
                initial="hidden" animate={anim}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="heading-lg font-bold"
              >
                Our <span className="text-gradient">Process</span>
              </motion.h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { n: '01', title: 'Discovery', desc: 'We learn your brand, goals, audience, and competition before touching a single design.' },
              { n: '02', title: 'Strategy',  desc: 'We define direction — positioning, messaging, visual language, and a clear creative brief.' },
              { n: '03', title: 'Execution', desc: `We design, build, and create with precision. You review, we refine until it's exactly right.` },
              { n: '04', title: 'Launch & Grow', desc: 'We deliver, launch, and stay available for ongoing support, optimisation, and growth.' },
            ].map((step, i) => (
              <motion.div
                key={step.n}
                variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 40 } }}
                initial="hidden" animate={anim}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="card-glass p-7 relative overflow-hidden group hover:-translate-y-1
                           transition-all duration-500"
              >
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-primary
                                scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <span
                  className="text-[2.5rem] font-bold leading-none mb-4 block"
                  style={{
                    background: 'var(--gradient-primary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    opacity: 0.5,
                  }}
                >
                  {step.n}
                </span>
                <h4 className="font-semibold text-sm mb-2">{step.title}</h4>
                <p className="text-muted text-xs leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════
            CTA STRIP
        ════════════════════════════════ */}
        <motion.div
          variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 40 } }}
          initial="hidden" animate={anim}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="card-glass p-12 lg:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-subtle opacity-40 pointer-events-none" />
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-primary opacity-40" />
          <div className="absolute -top-16 -left-16 w-48 h-48
                          bg-[radial-gradient(circle,rgba(109,40,255,0.12),transparent_65%)]" />
          <div className="absolute -bottom-16 -right-16 w-48 h-48
                          bg-[radial-gradient(circle,rgba(255,122,24,0.10),transparent_65%)]" />

          <div className="relative z-10">
            <p className="text-muted text-xs uppercase tracking-[0.22em] mb-4">
              Ready to start?
            </p>
            <h3 className="heading-lg font-bold mb-4 max-w-md mx-auto leading-tight">
            Let&apos;s build something{' '}
              <span className="text-gradient">great together</span>
            </h3>
            <p className="text-muted text-sm mb-8 max-w-sm mx-auto">
              Tell us about your project and we&apos;ll put together the right strategy for your brand.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/contact" className="btn-primary">Start a Project</a>
              <a href="/work"    className="btn-outline">See Our Work</a>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  )
}