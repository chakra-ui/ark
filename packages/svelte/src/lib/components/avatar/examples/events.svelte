<script lang="ts">
  import { Avatar } from '@ark-ui/svelte/avatar'
  import styles from 'styles/avatar.module.css'

  const handleStatusChange = (details: Avatar.StatusChangeDetails) => {
    console.log(details.status)
  }
</script>

<Avatar.Root class={styles.Root} onStatusChange={handleStatusChange}>
  <Avatar.Fallback class={styles.Fallback}>PA</Avatar.Fallback>
  <Avatar.Image class={styles.Image} src="https://i.pravatar.cc/3000" alt="avatar" />
</Avatar.Root>
