'use client'

import { useRef, useState } from 'react'

interface Props {
  src: string
  poster: string
}

export default function ShowcaseVideo({ src, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  return (
    <div
      className="relative w-full aspect-video overflow-hidden rounded-[var(--radius-lg)] group cursor-pointer"
      onClick={toggle}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        playsInline
        preload="metadata"
        onEnded={() => setPlaying(false)}
      />

      {/* Gradient vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

      {/* Play / Pause overlay */}
      <div
        className={`
          absolute inset-0 flex items-center justify-center
          transition-opacity duration-300
          ${playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}
        `}
      >
        <div
          className="
            w-14 h-14 rounded-full
            bg-white/10 backdrop-blur-md
            border border-white/20
            flex items-center justify-center
            transition-all duration-300
            group-hover:scale-110 group-hover:bg-white/20
          "
        >
          {playing ? (
            /* Pause icon */
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="3" y="2" width="4" height="14" rx="1.5" fill="white" />
              <rect x="11" y="2" width="4" height="14" rx="1.5" fill="white" />
            </svg>
          ) : (
            /* Play icon */
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M5 3.5L14.5 9L5 14.5V3.5Z" fill="white" />
            </svg>
          )}
        </div>
      </div>

      {/* Video badge */}
      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#ff2da0] animate-pulse" />
        <span className="text-[10px] font-medium text-white/80 tracking-widest uppercase">Video</span>
      </div>
    </div>
  )
}