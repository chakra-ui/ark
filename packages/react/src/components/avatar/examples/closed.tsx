import { Avatar as ArkAvatar } from '@ark-ui/react/avatar'
import { UserIcon } from 'lucide-react'
import { forwardRef } from 'react'
import styles from 'styles/avatar.module.css'

export interface AvatarProps extends ArkAvatar.RootProps {
  name?: string | undefined
  src?: string | undefined
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const { name, src, ...rootProps } = props
  return (
    <ArkAvatar.Root ref={ref} className={styles.Root} {...rootProps}>
      <ArkAvatar.Fallback className={styles.Fallback}>{getInitials(name) || <UserIcon />}</ArkAvatar.Fallback>
      <ArkAvatar.Image className={styles.Image} src={src} alt={name} />
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
