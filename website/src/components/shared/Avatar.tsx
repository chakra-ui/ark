'use client'
import { Circle } from '@/panda/jsx'
import Image from 'next/image'
import { circle } from 'panda/patterns'

const sizes = {
  sm: circle({ size: '8' }),
  md: circle({ size: '10' }),
  lg: circle({ size: '12' }),
  xl: circle({ size: '14' }),
}

type AvatarProps = {
  size?: keyof typeof sizes
  name: string
  src: string
}

export const Avatar = (props: AvatarProps) => {
  const { name, size = 'md', src } = props
  return (
    <Circle className={sizes[size]} bg="bg.muted" overflow="hidden" position="relative">
      <Image alt={name} src={src} fill />
    </Circle>
  )
}
