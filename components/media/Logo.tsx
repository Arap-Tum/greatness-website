import Image from 'next/image'
import logo from '@/assets/logo.png'

interface LogoProps {
  width?: number
  height?: number
  className?: string
  alt?: string
}

export default function Logo({
  width = 120,
  height = 120,
  className = '',
  alt = 'Logo',
}: LogoProps) {
  return (
    <Image
      src={logo}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority
    />
  )
}