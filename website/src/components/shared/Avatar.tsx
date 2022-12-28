import { Circle, panda } from '@/panda/jsx'
import type { ConditionalValue } from '@/panda/types'
import type { Size } from 'panda/types/token'

type AvatarProps = {
  size?: ConditionalValue<Size>
  name: string
  src: string
}

export const Avatar = (props: AvatarProps) => {
  const { name, size = '10', src } = props
  return (
    <Circle size={size} bg="bg.muted" overflow="hidden">
      <panda.img alt={name} src={src} />
    </Circle>
  )
}
