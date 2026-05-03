'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const navLinks = [
  { href: '/',         label: 'Home'     },
  { href: '/about',    label: 'About'    },
  { href: '/services', label: 'Services' },
  { href: '/showcase', label: 'Showcase' },
  { href: '/contact',  label: 'Contact'  },
]

const services = [
  'Brand Identity',
  'Web Design',
  'UI/UX Design',
  'Motion & Video',
  'Social Content',
  'Strategy & Copy',
]

const socials = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/greatnesscreative',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="5"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/254700000000',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: 'https://twitter.com/greatnesscreative',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/greatnesscreative',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
]

/* ─────────────────────────────────────────
   ANIMATED COLUMN WRAPPER
───────────────────────────────────────── */
function FadeUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const ref  = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   FOOTER CTA BAND
───────────────────────────────────────── */


/* ─────────────────────────────────────────
   FOOTER — main export
───────────────────────────────────────── */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative overflow-hidden border-t border-white/06"
      style={{ background: 'rgb(var(--color-surface))' }}
    >
      {/* Background depth orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-96 h-64
                        bg-[radial-gradient(ellipse,rgba(109,40,255,0.07),transparent_65%)]" />
        <div className="absolute top-0 right-1/4 w-80 h-48
                        bg-[radial-gradient(ellipse,rgba(255,45,160,0.06),transparent_65%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 lg:px-20 pt-20 pb-8">

       

        {/* ── GRADIENT DIVIDER ── */}
        <div className="divider-gradient mx-auto mb-16 opacity-60" />

        {/* ── MAIN FOOTER GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Col 1 — Brand */}
          <FadeUp delay={0}>
            <div className="lg:col-span-1 space-y-5">
              {/* Logo mark */}
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div
                  className="w-10 h-10 rounded-[10px] flex items-center justify-center
                             text-[0.65rem] font-bold text-white relative overflow-hidden
                             transition-transform duration-300 group-hover:scale-105"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0
                                  group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 tracking-wider">GC</span>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[0.55rem] text-muted uppercase tracking-[0.2em] font-medium">
                    Meets
                  </span>
                  <span
                    className="text-base font-bold tracking-tight"
                    style={{
                      background: 'var(--gradient-primary)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Greatness
                  </span>
                </div>
              </Link>

              <p className="text-muted text-sm leading-relaxed max-w-[240px]">
                We craft bold, high-impact digital experiences for modern brands that demand to be remembered.
              </p>

              {/* Availability pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                              border border-white/08 bg-white/02 text-xs text-muted">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full
                                   rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                </span>
                Available for new projects
              </div>

              {/* Socials */}
              <div className="flex items-center gap-2 pt-1">
                {socials.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full border border-white/08 bg-white/03
                               flex items-center justify-center text-muted
                               hover:border-white/20 hover:text-white hover:scale-110
                               transition-all duration-300"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Col 2 — Navigation */}
          <FadeUp delay={0.08}>
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted font-medium">
                Navigation
              </p>
              <ul className="space-y-3">
                {navLinks.map(({ href, label }, i) => (
                  <li key={href} className="flex items-center gap-3">
                    <span
                      className="text-[0.65rem] font-mono tabular-nums"
                      style={{
                        background: 'var(--gradient-primary)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      0{i + 1}
                    </span>
                    <Link
                      href={href}
                      className="text-sm text-muted hover:text-white
                                 transition-colors duration-300 group flex items-center gap-1"
                    >
                      <span>{label}</span>
                      <span className="opacity-0 -translate-x-1 group-hover:opacity-100
                                       group-hover:translate-x-0 transition-all duration-300 text-xs">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

          {/* Col 3 — Services */}
          <FadeUp delay={0.14}>
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted font-medium">
                Services
              </p>
              <ul className="space-y-3">
                {services.map((svc) => (
                  <li key={svc}>
                    <Link
                      href="/services"
                      className="text-sm text-muted hover:text-white
                                 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span
                        className="w-1 h-1 rounded-full shrink-0 opacity-40
                                   group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'var(--gradient-primary)' }}
                      />
                      {svc}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

          {/* Col 4 — Contact */}
          <FadeUp delay={0.2}>
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted font-medium">
                Get in Touch
              </p>

              <div className="space-y-4">
                {/* Email */}
                <a
                  href="mailto:hello@meetsgreaness.co"
                  className="group flex items-start gap-3"
                >
                  <div
                    className="w-8 h-8 rounded-lg border border-white/08 bg-white/03
                               flex items-center justify-center shrink-0 mt-0.5
                               group-hover:border-white/20 transition-all duration-300"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="1.8" className="text-muted group-hover:text-white transition-colors">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m2 7 10 7 10-7"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[0.65rem] text-muted uppercase tracking-widest mb-0.5">Email</p>
                    <p className="text-sm text-soft group-hover:text-white transition-colors duration-300">
                      hello@meetsgreaness.co
                    </p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/254700000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3"
                >
                  <div
                    className="w-8 h-8 rounded-lg border border-white/08 bg-white/03
                               flex items-center justify-center shrink-0 mt-0.5
                               group-hover:border-white/20 transition-all duration-300"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"
                         className="text-muted group-hover:text-white transition-colors">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[0.65rem] text-muted uppercase tracking-widest mb-0.5">WhatsApp</p>
                    <p className="text-sm text-soft group-hover:text-white transition-colors duration-300">
                      +254 700 000 000
                    </p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg border border-white/08 bg-white/03
                                  flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="1.8" className="text-muted">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[0.65rem] text-muted uppercase tracking-widest mb-0.5">Based in</p>
                    <p className="text-sm text-soft">Nairobi, Kenya</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div
          className="relative pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Gradient top accent on divider */}
          <div
            className="absolute top-0 left-0 w-32 h-px"
            style={{ background: 'var(--gradient-primary)', opacity: 0.5 }}
          />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-muted text-xs order-2 md:order-1">
              © {year}{' '}
              <span
                style={{
                  background: 'var(--gradient-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Greatness Creative
              </span>
              . All rights reserved.
            </p>

            {/* Legal links */}
            <div className="flex items-center gap-6 order-1 md:order-2">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-xs text-muted hover:text-white transition-colors duration-300"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Crafted badge */}
            <p className="text-muted text-xs order-3 flex items-center gap-1.5">
              Crafted with
              <span
                className="inline-block text-sm leading-none"
                style={{
                  background: 'var(--gradient-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                ♥
              </span>
             
            </p>
          </div>
        </div>

      </div>
    </footer>
  )
}