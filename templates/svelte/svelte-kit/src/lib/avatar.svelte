<script module lang="ts">
import { Avatar, type AvatarRootProps } from '@ark-ui/svelte/avatar'
import './avatar.css'

export interface AvatarProps extends AvatarRootProps {
  name: string
  src?: string
}
</script>

<script lang="ts">
  let { src, name }: AvatarProps = $props()

  const getInitials = $derived(() =>
    name
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase(),
  )
</script>

<Avatar.Root>
  <Avatar.Fallback>{getInitials()}</Avatar.Fallback>
  <Avatar.Image {src} alt={name} />
</Avatar.Root>
