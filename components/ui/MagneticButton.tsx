'use client'

import { useRef, type MouseEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Props {
  children:   ReactNode
  className?: string
  strength?:  number
  href?:      string
  target?:    string
  onClick?:   () => void
}

export default function MagneticButton({
  children,
  className = '',
  strength  = 0.35,
  href,
  target,
  onClick,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 280, damping: 18 })
  const sy = useSpring(y, { stiffness: 280, damping: 18 })

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const r  = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width  / 2)) * strength)
    y.set((e.clientY - (r.top  + r.height / 2)) * strength)
  }

  const onLeave = () => { x.set(0); y.set(0) }

  const inner = (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.96 }}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.div>
  )

  if (href) {
    return (
      <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
        {inner}
      </a>
    )
  }

  return <div onClick={onClick}>{inner}</div>
}