'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   MEDIA TYPES
═══════════════════════════════════════════════════════════════ */
type MediaItem =
  | { type: 'video';  src: string;  thumb?: string; caption?: string }
  | { type: 'poster'; src: string;  caption?: string }
  | { type: 'reel';   src: string;  thumb?: string; caption?: string }
  | { type: 'image';  src: string;  caption?: string }

interface Project {
  id: string
  title: string
  description: string
  media: MediaItem[]
}

interface Client {
  id: string
  name: string
  category: string
  tagline: string
  about: string
  logo: string | null   // ← replace null with '/logos/clientname.png'
  initials: string
  dot: string
  website?: string
  projects: Project[]
}

/* ═══════════════════════════════════════════════════════════════
   CLIENT DATA
   ─────────────────────────────────────────────────────────────
   HOW TO ADD REAL MEDIA:
   - video:  { type: 'video',  src: '/videos/brookhill-sports.mp4',  thumb: '/thumbs/brookhill-sports.jpg', caption: 'Sports Day Highlights' }
   - poster: { type: 'poster', src: '/posters/brookhill-poster.jpg', caption: 'Event Poster' }
   - reel:   { type: 'reel',   src: '/reels/monvid-reel.mp4',        thumb: '/thumbs/monvid-reel.jpg',      caption: 'Brand Reel' }
   - image:  { type: 'image',  src: '/images/wra-campaign.jpg',      caption: 'Campaign Visual' }
═══════════════════════════════════════════════════════════════ */
const clients: Client[] = [
  {
    id: 'brookhill',
    name: 'Brookhill Academy',
    category: 'Education',
    tagline: 'Brookhill Annual Sports Day',
    about:
      'Brookhill Academy is a school in Tassia, Embakasi, committed to providing a transformative learning experience that equips students with the skills, character, and values to excel and make a positive impact.',
    logo: null,       // ← replace: '/logos/brookhill.png'
    initials: 'BA',
    dot: '#ff7a18',
    website: 'https://brookhillacademy.ac.ke',
    projects: [
      {
        id: 'brookhill-sports',
        title: 'Annual Sports Day',
        description:
          'Full event coverage for Brookhill Annual Sports Day — photography, videography, and social media content to capture the day and amplify it online.',
        media: [
          // ↓ VIDEO SLOT — paste your video src here
          { type: 'video', src: '', thumb: '', caption: 'Sports Day Highlights Video' },
          // ↓ POSTER SLOT — paste your poster image src here
          { type: 'poster', src: '', caption: 'Event Poster' },
          // ↓ IMAGE SLOT — paste photo src here
          { type: 'image', src: '', caption: 'Sports Day Photo 1' },
          { type: 'image', src: '', caption: 'Sports Day Photo 2' },
          { type: 'image', src: '', caption: 'Sports Day Photo 3' },
        ],
      },
      {
        id: 'brookhill-branding',
        title: 'School Branding Assets',
        description: 'Social media graphics, school banners, and promotional materials.',
        media: [
          { type: 'poster', src: '', caption: 'School Banner' },
          { type: 'image',  src: '', caption: 'Social Media Graphics' },
        ],
      },
    ],
  },
  {
    id: 'golden-pasos',
    name: 'The Golden Pasos Centre',
    category: 'Lifestyle',
    tagline: 'Much more than gold',
    about:
      'The Golden Pasos Centre is a premium lifestyle and wellness destination offering a range of services designed to enrich everyday life.',
    logo: null,       // ← replace: '/logos/golden-pasos.png'
    initials: 'GP',
    dot: '#ff2da0',
    projects: [
      {
        id: 'gp-brand-reel',
        title: 'Brand Reel & Social Content',
        description: 'Short-form video content and brand reels for social media growth.',
        media: [
          // ↓ REEL SLOT
          { type: 'reel',  src: '', thumb: '', caption: 'Brand Reel' },
          { type: 'poster', src: '', caption: 'Social Media Poster 1' },
          { type: 'poster', src: '', caption: 'Social Media Poster 2' },
        ],
      },
      {
        id: 'gp-campaign',
        title: 'Promotional Campaign',
        description: 'Marketing campaign visuals distributed across digital channels.',
        media: [
          { type: 'image', src: '', caption: 'Campaign Visual 1' },
          { type: 'video', src: '', thumb: '', caption: 'Campaign Video' },
        ],
      },
    ],
  },
  {
    id: 'monvid',
    name: 'Monvid Insurance Agency Ltd.',
    category: 'Finance',
    tagline: 'Insurance solutions, simplified',
    about:
      'Monvid Insurance Agency Ltd. is a professional insurance brokerage offering tailored coverage solutions to individuals and businesses across Kenya.',
    logo: null,       // ← replace: '/logos/monvid.png'
    initials: 'MI',
    dot: '#6d28ff',
    projects: [
      {
        id: 'monvid-identity',
        title: 'Brand Identity & Digital Presence',
        description: 'Brand collateral, digital marketing assets, and social media management.',
        media: [
          { type: 'poster', src: '', caption: 'Brand Poster' },
          { type: 'image',  src: '', caption: 'Business Card Design' },
          { type: 'reel',   src: '', thumb: '', caption: 'Product Reel' },
        ],
      },
    ],
  },
  {
    id: 'wra',
    name: 'Water Resources Authority',
    category: 'Government',
    tagline: 'Securing Water Resources, Safeguarding Our Future',
    about:
      'WRA is Kenya\'s national government agency responsible for the regulation, management, and protection of water resources across the country.',
    logo: null,       // ← replace: '/logos/wra.png'
    initials: 'WRA',
    dot: '#ff7a18',
    website: 'https://wra.go.ke',
    projects: [
      {
        id: 'wra-campaign',
        title: 'Awareness Campaign',
        description:
          'Design and production of awareness campaign materials — posters, banners, and digital content to support water conservation messaging.',
        media: [
          { type: 'poster', src: '', caption: 'Campaign Poster' },
          { type: 'image',  src: '', caption: 'Banner Design' },
          { type: 'video',  src: '', thumb: '', caption: 'Campaign Video' },
        ],
      },
    ],
  },
]

const allCategories = ['All', ...Array.from(new Set(clients.map(c => c.category)))]

/* ═══════════════════════════════════════════════════════════════
   MEDIA SLOT COMPONENT
═══════════════════════════════════════════════════════════════ */
const typeIcon = {
  video:  { symbol: '▶', label: 'Video',  color: '#ff7a18' },
  reel:   { symbol: '⬡', label: 'Reel',   color: '#ff2da0' },
  poster: { symbol: '◈', label: 'Poster', color: '#6d28ff' },
  image:  { symbol: '✦', label: 'Image',  color: '#ff2da0' },
}

function MediaSlot({ item }: { item: MediaItem }) {
  const meta = typeIcon[item.type]

  /* ─── VIDEO / REEL ─── */
  if (item.type === 'video' || item.type === 'reel') {
    return (
      <div className="rounded-[var(--radius-lg)] overflow-hidden relative group">
        {/* Badge */}
        <div
          className="absolute top-3 left-3 z-10 text-xs font-semibold px-2.5 py-1
                     rounded-full text-white flex items-center gap-1.5"
          style={{ background: `${meta.color}cc` }}
        >
          <span>{meta.symbol}</span> {meta.label}
        </div>

        {item.src ? (
          /* ── Real video ── */
          <video
            controls
            poster={item.thumb || undefined}
            className="w-full aspect-video object-cover bg-black"
            preload="metadata"
          >
            <source src={item.src} type="video/mp4" />
            Your browser does not support video.
          </video>
        ) : (
          /* ── Placeholder ── */
          <div
            className="w-full aspect-video flex flex-col items-center justify-center
                       border border-white/05"
            style={{ background: `linear-gradient(135deg, ${meta.color}15, ${meta.color}05)` }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
              style={{ background: `${meta.color}22` }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 5l9 5-9 5V5z" fill="rgba(255,255,255,0.5)" />
              </svg>
            </div>
            {/* ↓ REPLACE: add src to the media item in the data above */}
            <p className="text-muted text-xs text-center px-4">
              {item.caption || `${meta.label} goes here`}
            </p>
            <p className="text-white/20 text-[10px] mt-1">
              Add <code className="text-white/30">src</code> in client data above
            </p>
          </div>
        )}

        {item.caption && item.src && (
          <p className="text-muted text-xs mt-2 px-1">{item.caption}</p>
        )}
      </div>
    )
  }

  /* ─── POSTER / IMAGE ─── */
  return (
    <div className="rounded-[var(--radius-lg)] overflow-hidden relative group">
      <div
        className="absolute top-3 left-3 z-10 text-xs font-semibold px-2.5 py-1
                   rounded-full text-white flex items-center gap-1.5"
        style={{ background: `${meta.color}cc` }}
      >
        <span>{meta.symbol}</span> {meta.label}
      </div>

      {item.src ? (
        /* ── Real image ── */
        <img
          src={item.src}
          alt={item.caption || 'Project media'}
          className="w-full aspect-video object-cover transition-transform duration-500
                     group-hover:scale-105"
        />
      ) : (
        /* ── Placeholder ── */
        <div
          className="w-full aspect-video flex flex-col items-center justify-center
                     border border-white/05"
          style={{ background: `linear-gradient(135deg, ${meta.color}15, ${meta.color}05)` }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mb-3 text-lg"
            style={{ background: `${meta.color}22`, color: meta.color }}
          >
            {meta.symbol}
          </div>
          {/* ↓ REPLACE: add src to the media item in the data above */}
          <p className="text-muted text-xs text-center px-4">
            {item.caption || `${meta.label} goes here`}
          </p>
          <p className="text-white/20 text-[10px] mt-1">
            Add <code className="text-white/30">src</code> in client data above
          </p>
        </div>
      )}

      {item.caption && item.src && (
        <p className="text-muted text-xs mt-2 px-1">{item.caption}</p>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PROJECT ACCORDION
═══════════════════════════════════════════════════════════════ */
function ProjectAccordion({ project, dot }: { project: Project; dot: string }) {
  const [open, setOpen] = useState(true)

  /* Split media: videos/reels left, posters/images right — or just grid */
  const videoMedia  = project.media.filter(m => m.type === 'video' || m.type === 'reel')
  const staticMedia = project.media.filter(m => m.type === 'poster' || m.type === 'image')

  return (
    <div className="card-glass overflow-hidden">
      {/* Project header — click to toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left group"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: dot }}
          />
          <div>
            <p className="font-semibold text-sm">{project.title}</p>
            <p className="text-muted text-xs mt-0.5">
              {project.media.length} media item{project.media.length !== 1 ? 's' : ''} ·{' '}
              {videoMedia.length} video{videoMedia.length !== 1 ? 's' : ''} ·{' '}
              {staticMedia.length} visual{staticMedia.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-muted text-xl leading-none shrink-0"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-white/05 pt-5">
              <p className="text-muted text-sm leading-relaxed mb-6">
                {project.description}
              </p>

              {/* ── Videos / Reels row ── */}
              {videoMedia.length > 0 && (
                <div className="mb-5">
                  <p className="text-xs uppercase tracking-widest text-muted mb-3 flex items-center gap-2">
                    <span
                      style={{
                        background: 'var(--gradient-primary)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      ▶
                    </span>
                    Videos & Reels
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {videoMedia.map((item, idx) => (
                      <MediaSlot key={idx} item={item} />
                    ))}
                  </div>
                </div>
              )}

              {/* ── Posters / Images row ── */}
              {staticMedia.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted mb-3 flex items-center gap-2">
                    <span
                      style={{
                        background: 'var(--gradient-primary)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      ◈
                    </span>
                    Posters & Images
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {staticMedia.map((item, idx) => (
                      <MediaSlot key={idx} item={item} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   CLIENT CARD
═══════════════════════════════════════════════════════════════ */
function ClientSection({ client, index, inView }: { client: Client; index: number; inView: boolean }) {
  return (
    <motion.div
      variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 50 } }}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay: 0.08 + index * 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      id={client.id}
      className="mb-20 scroll-mt-24"
    >
      {/* ── Client header ── */}
      <div className="card-glass p-7 mb-5 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-50"
          style={{ background: 'var(--gradient-primary)' }}
        />
        <div
          className="absolute -top-16 -right-16 w-48 h-48 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${client.dot}15, transparent 65%)`,
          }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-6">

          {/* Logo slot */}
          <div
            className="w-20 h-20 rounded-[var(--radius-lg)] flex items-center justify-center
                       border border-white/08 shrink-0"
            style={{ background: `radial-gradient(circle at 35% 35%, ${client.dot}25, ${client.dot}08)` }}
          >
            {client.logo ? (
              /* ↓ REAL LOGO: <Image src={client.logo} alt={client.name} width={56} height={56} className="object-contain" /> */
              <img src={client.logo} alt={client.name} className="w-14 h-14 object-contain" />
            ) : (
              <span
                className="text-base font-bold"
                style={{
                  background: 'var(--gradient-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {client.initials}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h2 className="font-bold text-xl">{client.name}</h2>
              <span className="text-xs border border-white/10 px-3 py-0.5 rounded-full text-muted">
                {client.category}
              </span>
            </div>
            <p className="text-soft text-sm leading-relaxed mb-3">{client.about}</p>
            {client.website && (
              <a
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted hover:text-white transition-colors duration-200
                           inline-flex items-center gap-1"
              >
                {client.website.replace('https://', '')}
                <span className="opacity-50">↗</span>
              </a>
            )}
          </div>

          <div className="text-right shrink-0">
            <p
              className="text-2xl font-bold"
              style={{
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {client.projects.length}
            </p>
            <p className="text-muted text-xs">
              Project{client.projects.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* ── Projects ── */}
      <div className="space-y-4 ml-0 sm:ml-4">
        {client.projects.map((project) => (
          <ProjectAccordion key={project.id} project={project} dot={client.dot} />
        ))}
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function ShowcasePage() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const anim   = inView ? 'visible' : 'hidden'

  const [activeCategory, setActiveCategory] = useState('All')
  const filtered = activeCategory === 'All'
    ? clients
    : clients.filter(c => c.category === activeCategory)

  return (
    <main ref={ref} className="relative overflow-hidden min-h-screen">

      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px]
                        bg-[radial-gradient(ellipse,rgba(255,45,160,0.06),transparent_65%)]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px]
                        bg-[radial-gradient(circle,rgba(109,40,255,0.05),transparent_60%)]" />
      </div>

      <div className="section-padding max-w-6xl mx-auto">

        {/* ════ HERO HEADER ════ */}
        <div className="text-center mb-6">
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
              variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: 70, opacity: 0 } }}
              initial="hidden" animate={anim}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="block heading-lg text-muted font-normal"
            >
              Brands We&apos;ve
            </motion.span>
          </div>
          <div className="overflow-hidden -mt-2">
            <motion.span
              variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: 70, opacity: 0 } }}
              initial="hidden" animate={anim}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="block heading-lg font-bold"
            >
              Worked With
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
            className="text-muted max-w-lg mx-auto mt-7 text-sm leading-relaxed"
          >
            Real brands, real results. Explore the work we&epos;ve done across branding,
            content, digital campaigns, and more.
          </motion.p>
        </div>

        {/* ════ CLIENT JUMP LINKS ════ */}
        <motion.div
          variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 20 } }}
          initial="hidden" animate={anim}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="card-glass p-5 mb-8 flex flex-wrap items-center justify-center gap-3"
        >
          {clients.map(c => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="text-xs px-4 py-2 rounded-full border border-white/08
                         text-muted hover:text-white hover:border-white/20
                         transition-all duration-300 flex items-center gap-2"
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: c.dot }}
              />
              {c.name}
            </a>
          ))}
        </motion.div>

        {/* ════ FILTER TABS ════ */}
        <motion.div
          variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 20 } }}
          initial="hidden" animate={anim}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="flex flex-wrap justify-center gap-2 mb-16"
        >
          {allCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="text-sm px-5 py-2 rounded-full border transition-all duration-300"
              style={{
                borderColor: activeCategory === cat ? 'transparent' : 'rgba(255,255,255,0.1)',
                background:  activeCategory === cat ? 'var(--gradient-primary)' : 'rgba(255,255,255,0.03)',
                color:       activeCategory === cat ? '#fff' : 'rgb(var(--color-muted))',
                fontWeight:  activeCategory === cat ? '600' : '400',
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ════ CLIENT SECTIONS ════ */}
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory}>
            {filtered.map((client, i) => (
              <ClientSection key={client.id} client={client} index={i} inView={inView} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ════ CTA STRIP ════ */}
        <motion.div
          variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 40 } }}
          initial="hidden" animate={anim}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="card-glass p-12 lg:p-16 text-center relative overflow-hidden mt-8"
        >
          <div className="absolute inset-0 bg-gradient-subtle opacity-40 pointer-events-none" />
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-primary opacity-40" />
          <div className="absolute -top-16 -left-16 w-48 h-48
                          bg-[radial-gradient(circle,rgba(109,40,255,0.12),transparent_65%)]" />
          <div className="absolute -bottom-16 -right-16 w-48 h-48
                          bg-[radial-gradient(circle,rgba(255,122,24,0.10),transparent_65%)]" />
          <div className="relative z-10">
            <p className="text-muted text-xs uppercase tracking-[0.22em] mb-4">
              Your brand could be here
            </p>
            <h3 className="heading-lg font-bold mb-4 max-w-md mx-auto leading-tight">
              Ready to create{' '}
              <span className="text-gradient">your story?</span>
            </h3>
            <p className="text-muted text-sm mb-8 max-w-sm mx-auto">
              Let&epos;s work together to bring your brand to life with purpose and creativity.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/contact" className="btn-primary">Start a Project</a>
              <a href="/services" className="btn-outline">Explore Services</a>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  )
}