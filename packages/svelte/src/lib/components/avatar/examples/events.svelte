<script lang="ts">
  import { Avatar } from '@ark-ui/svelte/avatar'
  import styles from 'styles/avatar.module.css'

  let status = $state('loading...')
</script>

<div class="vstack">
  <output>Status: {status}</output>
  <Avatar.Root class={styles.Root} onStatusChange={(e) => (status = e.status)}>
    <Avatar.Fallback class={styles.Fallback}>PA</Avatar.Fallback>
    <Avatar.Image class={styles.Image} src="https://i.pravatar.cc/3000?u=a" alt="avatar" />
  </Avatar.Root>
</div>
