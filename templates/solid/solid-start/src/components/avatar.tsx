import { Avatar as ArkAvatar, type AvatarRootProps } from '@ark-ui/solid'
import { Show, splitProps } from 'solid-js'
import './avatar.css'

export interface AvatarProps extends AvatarRootProps {
  name?: string
  src?: string
}

export const Avatar = (props: AvatarProps) => {
  const [localProps, rootProps] = splitProps(props, ['name', 'src'])

  return (
    <ArkAvatar.Root {...rootProps}>
      <ArkAvatar.Fallback>
        <Show when={localProps.name} fallback={<UserIcon />}>
          {getInitials(localProps.name)}
        </Show>
      </ArkAvatar.Fallback>
      <ArkAvatar.Image src={localProps.src} alt={localProps.name} />
    </ArkAvatar.Root>
  )
}

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
  >
    <title>User Icon</title>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const getInitials = (name = '') =>
  name
    .split(' ')
    .map((part) => part[0])
    .splice(0, 2)
    .join('')
    .toUpperCase()
