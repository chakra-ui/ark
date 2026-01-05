<script lang="ts">
  import { Avatar, useAvatar } from '@ark-ui/svelte/avatar'
  import styles from 'styles/avatar.module.css'

  const id = $props.id()
  const avatar = useAvatar({
    id,
    onStatusChange: (status) => {
      console.log('status', status)
    },
  })

  let counter = $state(0)
  const src = $derived(`https://i.pravatar.cc/300?u=${counter}`)
</script>

<button onclick={() => counter++}>Change Avatar</button>

<Avatar.RootProvider class={styles.Root} value={avatar}>
  <Avatar.Fallback class={styles.Fallback}>PA</Avatar.Fallback>
  <Avatar.Image class={styles.Image} {src} alt="avatar" />
</Avatar.RootProvider>
