'use client'

interface Props {
  src: string
  name: string
  initials: string
  accent: string
}

export default function CompanyLogo({ src, name, initials, accent }: Props) {
  return (
    <div className="relative w-16 h-16 shrink-0">
      <img
        src={src}
        alt={name}
        width={64}
        height={64}
        className="w-16 h-16 rounded-2xl border border-white/10 object-contain"
        style={{ background: accent + '22' }}
        onError={(e) => {
          e.currentTarget.style.display = 'none'
          const fallback = e.currentTarget.nextElementSibling as HTMLElement
          if (fallback) fallback.style.display = 'flex'
        }}
      />
      {/* Initials fallback — hidden until image errors */}
      <div
        className="w-16 h-16 rounded-2xl border border-white/10 items-center justify-center text-lg font-bold absolute inset-0"
        style={{
          background: accent + '22',
          color: accent,
          display: 'none',
        }}
      >
        {initials}
      </div>
    </div>
  )
}
