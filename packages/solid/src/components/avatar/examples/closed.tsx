import { Avatar as ArkAvatar } from '@ark-ui/solid/avatar'
import { UserIcon } from 'lucide-solid'
import { Show, splitProps } from 'solid-js'
import styles from 'styles/avatar.module.css'

export interface AvatarProps extends ArkAvatar.RootProps {
  name?: string
  src?: string
}

export const Avatar = (props: AvatarProps) => {
  const [localProps, rootProps] = splitProps(props, ['name', 'src'])

  return (
    <ArkAvatar.Root class={styles.Root} {...rootProps}>
      <ArkAvatar.Fallback class={styles.Fallback}>
        <Show when={localProps.name} fallback={<UserIcon />}>
          {getInitials(localProps.name)}
        </Show>
      </ArkAvatar.Fallback>
      <ArkAvatar.Image class={styles.Image} src={localProps.src} alt={localProps.name} />
    </ArkAvatar.Root>
  )
}

const getInitials = (name = '') =>
  name
    .split(' ')
    .map((part) => part[0])
    .splice(0, 2)
    .join('')
    .toUpperCase()
