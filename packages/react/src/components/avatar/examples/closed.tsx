import { UserIcon } from 'lucide-react'
import { forwardRef } from 'react'
import { Avatar as ArkAvatar } from '../'

export interface AvatarProps extends ArkAvatar.RootProps {
  name?: string
  src?: string
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const { name, src, ...rootProps } = props
  return (
    <ArkAvatar.Root ref={ref} {...rootProps}>
      <ArkAvatar.Fallback>{getInitials(name) || <UserIcon />}</ArkAvatar.Fallback>
      <ArkAvatar.Image src={src} alt={name} />
    </ArkAvatar.Root>
  )
})

const getInitials = (name = '') =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
