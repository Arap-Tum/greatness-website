'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/* ─────────────────────────────────────────
   ROUTES
───────────────────────────────────────── */
const links = [
  { href: '/',          label: 'Home'     },
  { href: '/about',     label: 'About'    },
  { href: '/services',  label: 'Services' },
  { href: '/showcase',  label: 'Showcase' },
  { href: '/contact',   label: 'Contact'  },
]

/* ─────────────────────────────────────────
   GRADIENT LOGO MARK
───────────────────────────────────────── */
function LogoMark() {
  return (
    <Link href="/" className="flex items-center gap-3 group shrink-0">
      {/* Icon mark */}
      <div
        className="w-9 h-9 rounded-[10px] flex items-center justify-center
                   text-[0.65rem] font-bold text-white relative overflow-hidden
                   transition-transform duration-300 group-hover:scale-105"
        style={{ background: 'var(--gradient-primary)' }}
      >
        {/* Inner shine */}
        <div className="absolute inset-0 bg-white/10 rounded-[10px]
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="relative z-10 tracking-wider">GC</span>
      </div>

      {/* Word mark */}
      <div className="flex flex-col leading-none">
        <span className="text-[0.6rem] text-muted uppercase tracking-[0.2em] font-medium">
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
  )
}

/* ─────────────────────────────────────────
   NAV LINK (desktop)
───────────────────────────────────────── */
function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className="relative py-1 text-sm font-medium transition-colors duration-300 group"
      style={{ color: active ? '#fff' : 'rgb(var(--color-muted))' }}
    >
      {/* Hover colour lift */}
      <span className="relative z-10 group-hover:text-white transition-colors duration-300">
        {label}
      </span>

      {/* Active gradient underline */}
      {active && (
        <motion.span
          layoutId="nav-pill"
          className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
          style={{ background: 'var(--gradient-primary)' }}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        />
      )}

      {/* Hover underline (only when not active) */}
      {!active && (
        <span
          className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full
                     scale-x-0 group-hover:scale-x-100 origin-left
                     transition-transform duration-300"
          style={{ background: 'rgba(255,255,255,0.15)' }}
        />
      )}
    </Link>
  )
}

/* ─────────────────────────────────────────
   HAMBURGER ICON
───────────────────────────────────────── */
function Hamburger({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? 'Close menu' : 'Open menu'}
      className="md:hidden relative z-50 flex flex-col gap-[5px] p-2.5
                 rounded-xl border border-white/08 bg-white/03
                 hover:bg-white/06 transition-colors duration-300"
    >
      {/* Line 1 */}
      <motion.span
        animate={open ? { rotate: 45, y: 7, width: '22px' } : { rotate: 0, y: 0, width: '22px' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="block h-[1.5px] rounded-full bg-white origin-center"
        style={{ width: 22 }}
      />
      {/* Line 2 */}
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        className="block h-[1.5px] rounded-full origin-center"
        style={{
          width: 14,
          background: 'var(--gradient-primary)',
        }}
      />
      {/* Line 3 */}
      <motion.span
        animate={open ? { rotate: -45, y: -7, width: '22px' } : { rotate: 0, y: 0, width: '22px' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="block h-[1.5px] rounded-full bg-white origin-center"
        style={{ width: 22 }}
      />
    </button>
  )
}

/* ─────────────────────────────────────────
   MOBILE MENU OVERLAY
───────────────────────────────────────── */
function MobileMenu({
  open,
  pathname,
  onClose,
}: {
  open: boolean
  pathname: string
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-40 flex flex-col overflow-hidden"
          style={{ background: 'rgb(var(--color-bg))' }}
        >
          {/* Gradient orbs for visual depth */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-80 h-80
                            bg-[radial-gradient(circle,rgba(109,40,255,0.12),transparent_65%)]" />
            <div className="absolute bottom-0 left-0 w-80 h-80
                            bg-[radial-gradient(circle,rgba(255,45,160,0.08),transparent_65%)]" />
            <div className="absolute bottom-1/3 right-1/4 w-48 h-48
                            bg-[radial-gradient(circle,rgba(255,122,24,0.06),transparent_65%)]" />
          </div>

          {/* Horizontal accent lines */}
          <div className="absolute top-1/2 left-0 right-0 h-px opacity-5"
               style={{ background: 'var(--gradient-primary)' }} />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between h-full
                          px-8 pt-28 pb-12">

            {/* Links */}
            <nav className="flex flex-col gap-1">
              {links.map(({ href, label }, i) => {
                const active = pathname === href
                return (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      delay: i * 0.07,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={href}
                      onClick={onClose}
                      className="group flex items-center gap-4 py-4
                                 border-b border-white/05 last:border-0"
                    >
                      {/* Number */}
                      <span
                        className="text-xs font-mono w-6 shrink-0 transition-colors duration-300"
                        style={{
                          color: active ? undefined : 'rgba(255,255,255,0.2)',
                          background: active ? 'var(--gradient-primary)' : undefined,
                          WebkitBackgroundClip: active ? 'text' : undefined,
                          WebkitTextFillColor: active ? 'transparent' : undefined,
                        }}
                      >
                        0{i + 1}
                      </span>

                      {/* Label */}
                      <span
                        className="text-4xl font-bold tracking-tight leading-none
                                   transition-colors duration-300"
                        style={{
                          color: active ? '#fff' : 'rgba(255,255,255,0.35)',
                        }}
                      >
                        {label}
                      </span>

                      {/* Active dot */}
                      {active && (
                        <motion.span
                          layoutId="mobile-dot"
                          className="ml-auto w-2 h-2 rounded-full shrink-0"
                          style={{ background: 'var(--gradient-primary)' }}
                        />
                      )}

                      {/* Arrow on hover */}
                      {!active && (
                        <span className="ml-auto text-white/20 text-xl
                                         opacity-0 group-hover:opacity-100
                                         -translate-x-2 group-hover:translate-x-0
                                         transition-all duration-300">
                          →
                        </span>
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            {/* Bottom CTA + socials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.42, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <Link
                href="/contact"
                onClick={onClose}
                className="btn-primary w-full text-center block"
              >
                Lets Talk →
              </Link>

              {/* Quick contact */}
              <div className="flex items-center justify-between pt-2">
                <p className="text-muted text-xs">
                  Or reach us directly
                </p>
                <div className="flex gap-3">
                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/254700000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-white/08 bg-white/03
                               flex items-center justify-center text-muted
                               hover:border-white/20 hover:text-white transition-all duration-300"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a
                    href="https://instagram.com/greatnesscreative"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-white/08 bg-white/03
                               flex items-center justify-center text-muted
                               hover:border-white/20 hover:text-white transition-all duration-300"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="1.8">
                      <rect x="2" y="2" width="20" height="20" rx="5"/>
                      <circle cx="12" cy="12" r="5"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─────────────────────────────────────────
   NAVBAR — main export
───────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)
  const pathname                = usePathname()

  /* Scroll listener */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  /* Close on route change */
  useEffect(() => { setOpen(false) }, [pathname])

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* ════ TOP BAR ════ */}
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      >
        {/* Glass background — appears on scroll */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: scrolled
              ? 'rgba(0,0,0,0.75)'
              : 'transparent',
            backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
            borderBottom: scrolled
              ? '1px solid rgba(255,255,255,0.06)'
              : '1px solid transparent',
            boxShadow: scrolled
              ? '0 1px 40px rgba(0,0,0,0.4)'
              : 'none',
          }}
        />

        {/* Gradient top border — always visible, fades on scroll */}
        <div
          className="absolute top-0 left-0 right-0 h-[1.5px] transition-opacity duration-500"
          style={{
            background: 'var(--gradient-primary)',
            opacity: scrolled ? 0.6 : 0,
          }}
        />

        {/* Inner layout */}
        <div className="relative max-w-6xl mx-auto px-6 md:px-12 lg:px-20
                        flex items-center justify-between h-[72px]">

          <LogoMark />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map(({ href, label }) => (
              <NavLink
                key={href}
                href={href}
                label={label}
                active={pathname === href}
              />
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Availability pulse */}
            <div className="flex items-center gap-2 text-xs text-muted">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full
                                 rounded-full bg-green-400 opacity-70" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
              </span>
              Available
            </div>

            <Link href="/contact" className="btn-primary !py-2.5 !px-5 !text-sm">
              Lets Talk
            </Link>
          </div>

          {/* Mobile hamburger */}
          <Hamburger open={open} onClick={() => setOpen(!open)} />
        </div>
      </motion.header>

      {/* ════ MOBILE MENU ════ */}
      <MobileMenu
        open={open}
        pathname={pathname}
        onClose={() => setOpen(false)}
      />
    </>
  )
}