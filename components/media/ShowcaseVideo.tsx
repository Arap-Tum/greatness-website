'use client'

import { useRef, useState, useEffect } from 'react'

interface Props {
  src: string
}

export default function ShowcaseVideo({ src }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

  // Autoplay on mount (muted — required by browsers)
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
  }, [])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) }
    else { v.pause(); setPlaying(false) }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  return (
    // A2 poster ratio ≈ 1:√2 → portrait 2:3 is the closest standard CSS ratio
    <div
      className="relative w-full overflow-hidden rounded-[var(--radius-lg)] group cursor-pointer bg-black"
      style={{ aspectRatio: '2 / 3' }}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        onEnded={() => setPlaying(false)}
      />

      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* Play / Pause button */}
      <div
        className={`
          absolute inset-0 flex items-center justify-center
          transition-opacity duration-300
          ${playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}
        `}
      >
        <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
          {playing ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="3" y="2" width="4" height="14" rx="1.5" fill="white" />
              <rect x="11" y="2" width="4" height="14" rx="1.5" fill="white" />
            </svg>
          ) : (
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

      {/* Mute toggle */}
      <button
        onClick={toggleMute}
        className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2">
            <path d="M11 5L6 9H2v6h4l5 4V5z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
        <span className="text-[10px] font-medium text-white/70">{muted ? 'Unmute' : 'Mute'}</span>
      </button>
    </div>
  )
}