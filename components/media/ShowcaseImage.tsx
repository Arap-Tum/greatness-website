import Image from 'next/image'

interface Props {
  src: string
  alt: string
}

export default function ShowcaseImage({ src, alt }: Props) {
  return (
    // A2 portrait ratio: 2:3
    <div className="relative w-full overflow-hidden rounded-[var(--radius-lg)] group" style={{ aspectRatio: '2 / 3' }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />

      {/* Subtle vignette on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Image badge */}
      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-[10px] font-medium text-white/70 tracking-widest uppercase">Image</span>
      </div>
    </div>
  )
}