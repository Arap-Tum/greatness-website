'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links = [
  { href: '/',         label: 'Home'     },
  { href: '/about',    label: 'About'    },
  { href: '/services', label: 'Services' },
  { href: '/#work',    label: 'Work'     },
  { href: '/#contact', label: 'Contact'  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)
  const pathname                = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* ── Top bar ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-base/90 backdrop-blur-xl border-b border-subtle'
            : 'bg-transparent'
        )}
      >
        <div className="container max-w-site mx-auto flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <span className={cn(
              'w-7 h-7 flex items-center justify-center rounded-sm',
              'text-gold text-[0.6rem] font-semibold tracking-wide',
              'border border-gold/40 transition-all duration-400 ease-out-expo',
              'group-hover:bg-gold/10'
            )}>
              MG
            </span>
            <span className={cn(
              'font-display text-base font-medium tracking-wider text-cream',
              'transition-colors duration-250 group-hover:text-gold'
            )}>
              Meets Greatness
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'nav-link relative py-1',
                  pathname === href && 'nav-link-active'
                )}
              >
                {label}
                {pathname === href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 w-full h-px bg-gold"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/#contact"
              className="hidden md:inline-flex btn-ghost !py-2 !px-5 !text-[0.65rem]"
            >
              Let's Talk
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden relative flex flex-col gap-[5px] p-2 z-50"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block w-5.5 h-px bg-cream"
              />
              <motion.span
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block w-4 h-px bg-gold"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block w-5.5 h-px bg-cream"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-void flex flex-col items-center justify-center gap-10"
          >
            {/* Decorative horizontal lines */}
            <div className="absolute top-1/2 left-0 w-[40%] h-px bg-gold/10" />
            <div className="absolute top-1/2 right-0 w-[30%] h-px bg-gold/8" />

            {links.map(({ href, label }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0  }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'font-display text-5xl font-light tracking-tight italic',
                    'transition-colors duration-250',
                    pathname === href ? 'text-gold' : 'text-cream hover:text-gold'
                  )}
                >
                  {label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <Link href="/#contact" className="btn-gold" onClick={() => setOpen(false)}>
                Let&apos;s Talk
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}