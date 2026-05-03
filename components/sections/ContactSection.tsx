'use client'

import { useRef, useState, ChangeEvent, FormEvent } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ═══════════════════════════════════════════════════
   CONFIGURATION — update these with real details
═══════════════════════════════════════════════════ */
const CONTACT = {
  whatsapp:  'https://wa.me/254700000000',     // ← replace with real number
  email:     'hello@greatnesscreative.co.ke',  // ← replace with real email
  instagram: 'https://instagram.com/greatnesscreative', // ← replace
  twitter:   'https://twitter.com/greatnesscreative',   // ← replace
  location:  'Nairobi, Kenya',
  response:  'Within 24 hours',
}

const SERVICES = [
  'Branding & Identity',
  'Website Design',
  'Social Media',
  'SEO & Ads',
  'Content Creation',
  'Graphic Design',
  'Influencer Marketing',
  'Campaign Management',
  'Something else',
]

/* ═══════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════ */
interface FormState {
  name: string
  email: string
  services: string[]
  message: string
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

/* ═══════════════════════════════════════════════════
   ICONS (inline SVG — no extra deps)
═══════════════════════════════════════════════════ */
const IconWhatsApp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const IconEmail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m2 7 10 7 10-7"/>
  </svg>
)

const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="5"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
)

const IconTwitter = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const IconPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
    <circle cx="12" cy="9" r="2.5"/>
  </svg>
)

const IconClock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="9"/>
    <path d="M12 7v5l3 3"/>
  </svg>
)

const IconCheck = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 13l4 4L19 7"/>
  </svg>
)

/* ═══════════════════════════════════════════════════
   CONTACT SECTION — used on both homepage + page
═══════════════════════════════════════════════════ */
export default function ContactSection({ isPage = false }: { isPage?: boolean }) {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const anim   = inView ? 'visible' : 'hidden'

  const [form, setForm] = useState<FormState>({
    name: '', email: '', services: [], message: '',
  })
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [focused, setFocused] = useState<string | null>(null)

  /* ── Field helpers ── */
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const toggleService = (s: string) => {
    setForm(prev => ({
      ...prev,
      services: prev.services.includes(s)
        ? prev.services.filter(x => x !== s)
        : [...prev.services, s],
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    /* ── Replace this with your real form submission logic ──
       e.g. fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) })
       or a service like Resend, Formspree, EmailJS, etc.
    ── */
    await new Promise(r => setTimeout(r, 1800)) // simulate network
    setStatus('success')
  }

  const inputBase = `w-full bg-transparent text-white text-sm placeholder:text-white/25
    outline-none transition-all duration-300 resize-none`

  const fieldWrap = (name: string) =>
    `relative rounded-[var(--radius-md)] border transition-all duration-300 px-4 py-3
    ${focused === name
      ? 'border-white/25 bg-white/04 shadow-[0_0_0_3px_rgba(255,45,160,0.08)]'
      : 'border-white/08 bg-white/02 hover:border-white/14'}`

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden ${isPage ? 'min-h-screen' : ''} section-padding`}
    >
      {/* ── Ambient glows ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]
                        bg-[radial-gradient(ellipse,rgba(109,40,255,0.08),transparent_65%)]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px]
                        bg-[radial-gradient(circle,rgba(255,45,160,0.05),transparent_60%)]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px]
                        bg-[radial-gradient(circle,rgba(255,122,24,0.04),transparent_60%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* ════ SECTION HEADER ════ */}
        <div className="text-center mb-16">
          <div className="overflow-hidden">
            <motion.p
              variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 16 } }}
              initial="hidden" animate={anim}
              transition={{ duration: 0.6 }}
              className="text-muted text-xs uppercase tracking-[0.22em] mb-2"
            >
              Let&apos;s Talk
            </motion.p>
          </div>
          <div className="overflow-hidden">
            <motion.span
              variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: 60, opacity: 0 } }}
              initial="hidden" animate={anim}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="block heading-lg text-muted font-normal"
            >
              We&apos;d Love to
            </motion.span>
          </div>
          <div className="overflow-hidden -mt-2">
            <motion.span
              variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: 60, opacity: 0 } }}
              initial="hidden" animate={anim}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="block heading-lg font-bold"
            >
              Hear From You
            </motion.span>
          </div>
          <motion.div
            variants={{ visible: { scaleX: 1, opacity: 1 }, hidden: { scaleX: 0, opacity: 0 } }}
            initial="hidden" animate={anim}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="divider-gradient mx-auto mt-6 origin-left"
          />
        </div>

        {/* ════ MAIN SPLIT LAYOUT ════ */}
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-12 items-start">

          {/* ── LEFT: Invitation + contact methods ── */}
          <div className="space-y-6">

            {/* Human copy card */}
            <motion.div
              variants={{ visible: { opacity: 1, x: 0 }, hidden: { opacity: 0, x: -40 } }}
              initial="hidden" animate={anim}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="card-glass p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-primary opacity-40" />
              <div className="absolute -top-12 -right-12 w-40 h-40
                              bg-[radial-gradient(circle,rgba(255,45,160,0.1),transparent_65%)]
                              pointer-events-none" />

              <div className="relative z-10">
                <p className="text-soft text-base leading-relaxed mb-5">
                  We don&epos;t do cold, robotic replies. When you reach out, a real human from our
                  team reads your message and gets back to you personally.
                </p>
                <p className="text-muted text-sm leading-relaxed">
                  Whether you have a fully-formed brief or just a rough idea — we're here
                  to listen, advise, and help you figure out the right next step.
                  No pressure, no hard sell.
                </p>
              </div>
            </motion.div>

            {/* Availability badges */}
            <motion.div
              variants={{ visible: { opacity: 1, x: 0 }, hidden: { opacity: 0, x: -40 } }}
              initial="hidden" animate={anim}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-3"
            >
              {[
                { icon: <IconClock />, text: `Replies ${CONTACT.response}` },
                { icon: <IconPin />,   text: CONTACT.location },
              ].map(b => (
                <div
                  key={b.text}
                  className="flex items-center gap-2 text-xs text-muted border border-white/08
                             px-4 py-2.5 rounded-full bg-white/02"
                >
                  <span className="opacity-50">{b.icon}</span>
                  {b.text}
                </div>
              ))}
              {/* Live indicator */}
              <div className="flex items-center gap-2 text-xs text-muted border border-white/08
                              px-4 py-2.5 rounded-full bg-white/02">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full
                                   bg-green-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                Available for new projects
              </div>
            </motion.div>

            {/* Direct contact methods */}
            <motion.div
              variants={{ visible: { opacity: 1, x: 0 }, hidden: { opacity: 0, x: -40 } }}
              initial="hidden" animate={anim}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-3"
            >
              {/* WhatsApp — primary */}
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-[var(--radius-xl)]
                           border border-white/06 group transition-all duration-400
                           hover:-translate-y-0.5 relative overflow-hidden"
                style={{ background: 'rgba(37,211,102,0.04)' }}
              >
                <div className="absolute inset-0 bg-[rgba(37,211,102,0.04)] opacity-0
                                group-hover:opacity-100 transition-opacity duration-300" />
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center
                             shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(37,211,102,0.12)', color: '#25d366' }}
                >
                  <IconWhatsApp />
                </div>
                <div className="relative z-10">
                  <p className="text-sm font-semibold text-white">Chat on WhatsApp</p>
                  <p className="text-muted text-xs mt-0.5">Fastest way to reach us</p>
                </div>
                <span className="ml-auto text-muted opacity-0 group-hover:opacity-100
                                 transition-all duration-300 translate-x-1 group-hover:translate-x-0
                                 text-sm relative z-10">
                  →
                </span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-4 p-5 rounded-[var(--radius-xl)]
                           border border-white/06 group transition-all duration-400
                           hover:-translate-y-0.5 relative overflow-hidden bg-white/02"
              >
                <div className="absolute inset-0 bg-gradient-subtle opacity-0
                                group-hover:opacity-100 transition-opacity duration-300" />
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center
                             shrink-0 transition-transform duration-300 group-hover:scale-110
                             border border-white/08"
                  style={{ background: 'rgba(109,40,255,0.12)', color: '#a78bfa' }}
                >
                  <IconEmail />
                </div>
                <div className="relative z-10">
                  <p className="text-sm font-semibold text-white">Send an Email</p>
                  <p className="text-muted text-xs mt-0.5">{CONTACT.email}</p>
                </div>
                <span className="ml-auto text-muted opacity-0 group-hover:opacity-100
                                 transition-all duration-300 translate-x-1 group-hover:translate-x-0
                                 text-sm relative z-10">
                  →
                </span>
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={{ visible: { opacity: 1, x: 0 }, hidden: { opacity: 0, x: -40 } }}
              initial="hidden" animate={anim}
              transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="card-glass p-5"
            >
              <p className="text-muted text-xs uppercase tracking-widest mb-4">
                Follow our work
              </p>
              <div className="flex gap-3">
                {[
                  { href: CONTACT.instagram, icon: <IconInstagram />, label: 'Instagram' },
                  { href: CONTACT.twitter,   icon: <IconTwitter />,   label: 'Twitter / X' },
                ].map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    className="flex items-center gap-2.5 text-xs text-muted px-4 py-2.5
                               rounded-full border border-white/08 bg-white/02
                               hover:text-white hover:border-white/20 transition-all duration-300"
                  >
                    {s.icon}
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* "What happens next" mini flow */}
            <motion.div
              variants={{ visible: { opacity: 1, x: 0 }, hidden: { opacity: 0, x: -40 } }}
              initial="hidden" animate={anim}
              transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="card-glass p-6"
            >
              <p className="text-muted text-xs uppercase tracking-widest mb-5">
                What happens next
              </p>
              <div className="space-y-4">
                {[
                  { n: '01', text: 'You send us your message or reach out on WhatsApp.' },
                  { n: '02', text: 'We review your brief and reply within 24 hours.' },
                  { n: '03', text: 'We hop on a quick call to align on your goals.' },
                  { n: '04', text: 'We craft a proposal tailored to your brand.' },
                ].map((step, i) => (
                  <div key={step.n} className="flex items-start gap-3">
                    <span
                      className="text-xs font-bold shrink-0 mt-0.5"
                      style={{
                        background: 'var(--gradient-primary)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {step.n}
                    </span>
                    <p className="text-muted text-xs leading-relaxed">{step.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: The Form ── */}
          <motion.div
            variants={{ visible: { opacity: 1, x: 0 }, hidden: { opacity: 0, x: 40 } }}
            initial="hidden" animate={anim}
            transition={{ delay: 0.25, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="card-glass p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-primary opacity-50" />
              <div className="absolute -bottom-20 -right-20 w-64 h-64
                              bg-[radial-gradient(circle,rgba(109,40,255,0.08),transparent_65%)]
                              pointer-events-none" />

              <AnimatePresence mode="wait">

                {/* ── IDLE / LOADING state ── */}
                {status !== 'success' && (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    onSubmit={handleSubmit}
                    className="space-y-5 relative z-10"
                  >
                    <div>
                      <p className="font-bold text-xl mb-1">Start a conversation</p>
                      <p className="text-muted text-sm">
                        Fill this in — or just WhatsApp us if forms aren't your thing.
                      </p>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-xs text-muted mb-2 uppercase tracking-wider">
                        Your name
                      </label>
                      <div className={fieldWrap('name')}>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="e.g. Amara Osei"
                          value={form.name}
                          onChange={handleChange}
                          onFocus={() => setFocused('name')}
                          onBlur={() => setFocused(null)}
                          className={inputBase}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs text-muted mb-2 uppercase tracking-wider">
                        Email address
                      </label>
                      <div className={fieldWrap('email')}>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="you@yourbrand.com"
                          value={form.email}
                          onChange={handleChange}
                          onFocus={() => setFocused('email')}
                          onBlur={() => setFocused(null)}
                          className={inputBase}
                        />
                      </div>
                    </div>

                    {/* Service interest pills */}
                    <div>
                      <label className="block text-xs text-muted mb-3 uppercase tracking-wider">
                        What can we help with?{' '}
                        <span className="normal-case tracking-normal opacity-60">
                          (pick any)
                        </span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {SERVICES.map(s => {
                          const active = form.services.includes(s)
                          return (
                            <button
                              key={s}
                              type="button"
                              onClick={() => toggleService(s)}
                              className="text-xs px-3.5 py-2 rounded-full border
                                         transition-all duration-300"
                              style={{
                                borderColor: active ? 'transparent' : 'rgba(255,255,255,0.1)',
                                background:  active ? 'var(--gradient-primary)' : 'rgba(255,255,255,0.03)',
                                color:       active ? '#fff' : 'rgb(var(--color-muted))',
                                fontWeight:  active ? '500' : '400',
                              }}
                            >
                              {s}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs text-muted mb-2 uppercase tracking-wider">
                        Tell us about your project
                      </label>
                      <div className={fieldWrap('message')}>
                        <textarea
                          name="message"
                          required
                          rows={5}
                          placeholder="Share what you're working on — even rough ideas are welcome. The more context, the better we can help."
                          value={form.message}
                          onChange={handleChange}
                          onFocus={() => setFocused('message')}
                          onBlur={() => setFocused(null)}
                          className={`${inputBase} leading-relaxed`}
                        />
                      </div>
                      <p className="text-right text-white/20 text-[10px] mt-1">
                        {form.message.length} characters
                      </p>
                    </div>

                    {/* Privacy note */}
                    <p className="text-white/25 text-[11px] leading-relaxed">
                      No spam. No unsolicited follow-ups. Your info is only used to
                      respond to your inquiry.
                    </p>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full btn-primary flex items-center justify-center gap-3
                                 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? (
                        <>
                          <svg
                            className="animate-spin"
                            width="16" height="16" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2"
                          >
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83
                                     M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                              strokeLinecap="round"
                            />
                          </svg>
                          Sending your message…
                        </>
                      ) : (
                        <>
                          Send Message
                          <span className="text-lg">→</span>
                        </>
                      )}
                    </button>

                    {status === 'error' && (
                      <p className="text-red-400 text-xs text-center">
                        Something went wrong. Try WhatsApp or email instead.
                      </p>
                    )}
                  </motion.form>
                )}

                {/* ── SUCCESS state ── */}
                {status === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 flex flex-col items-center justify-center
                               text-center py-16 space-y-5"
                  >
                    {/* Checkmark circle */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="w-20 h-20 rounded-full flex items-center justify-center
                                 bg-gradient-primary text-white shadow-[var(--glow-primary)]"
                    >
                      <IconCheck />
                    </motion.div>

                    <div>
                      <h3 className="font-bold text-2xl mb-3">
                        Message received!{' '}
                        <span className="text-gradient">We've got you.</span>
                      </h3>
                      <p className="text-muted text-sm leading-relaxed max-w-sm">
                        Thank you, {form.name.split(' ')[0] || 'friend'}. A real human from our
                        team will read your message and reply within 24 hours. Keep an
                        eye on your inbox.
                      </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 pt-2">
                      <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                         className="btn-primary text-sm flex items-center gap-2">
                        <IconWhatsApp />
                        Follow up on WhatsApp
                      </a>
                      <button
                        onClick={() => { setStatus('idle'); setForm({ name: '', email: '', services: [], message: '' }) }}
                        className="btn-outline text-sm"
                      >
                        Send another
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
