'use client'

import ContactSection from '@/components/sections/ContactSection'

/*
  USAGE
  ─────
  • Homepage section:  <ContactSection />             (isPage defaults to false)
  • Contact page:      <ContactSection isPage />       (adds min-h-screen)

  ROUTING
  ─────
  Place this file at: app/contact/page.tsx
  Place ContactSection at: components/sections/ContactSection.tsx

  FORM SUBMISSION
  ─────
  In ContactSection.tsx, find the handleSubmit function and replace the
  simulated await with your real API call:

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (!res.ok) { setStatus('error'); return }
    setStatus('success')

  REAL CONTACT DETAILS
  ─────
  Update the CONTACT object at the top of ContactSection.tsx:
    whatsapp:  'https://wa.me/254XXXXXXXXX'
    email:     'hello@yourdomain.co.ke'
    instagram: 'https://instagram.com/yourhandle'
    twitter:   'https://twitter.com/yourhandle'
*/

export default function ContactPage() {
  return (
    <main>
      {/* Page-level ambient — sits behind ContactSection's own glows */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(109,40,255,0.06),transparent_60%)]" />
      </div>

      <ContactSection isPage />
    </main>
  )
}