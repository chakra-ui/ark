<script lang="ts">
  import { Avatar, type AvatarRootBaseProps } from '@ark-ui/svelte/avatar'
  import { UserIcon } from 'lucide-svelte'
  import styles from 'styles/avatar.module.css'

  interface Props extends AvatarRootBaseProps {
    name?: string | undefined
    src?: string | undefined
  }

  let { name, src, ...rootProps }: Props = $props()

  const getInitials = (name = '') =>
    name
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()

  const initials = $derived(getInitials(name))
</script>

<Avatar.Root class={styles.Root} {...rootProps}>
  <Avatar.Fallback class={styles.Fallback}>
    {#if initials}
      {initials}
    {:else}
      <UserIcon />
    {/if}
  </Avatar.Fallback>
  <Avatar.Image class={styles.Image} {src} alt={name} />
</Avatar.Root>
