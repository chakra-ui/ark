<script lang="ts">
  import { Avatar } from '@ark-ui/svelte/avatar'
  import styles from 'styles/avatar.module.css'
</script>

<Avatar.Root class={styles.Root}>
  <Avatar.Context>
    {#snippet api(avatar)}
      <Avatar.Fallback class={styles.Fallback}>
        {#if avatar().loaded}
          <p>PA</p>
        {:else}
          <p>Loading</p>
        {/if}
      </Avatar.Fallback>
    {/snippet}
  </Avatar.Context>
  <Avatar.Image class={styles.Image} src="https://i.pravatar.cc/3000?u=b" alt="avatar" />
</Avatar.Root>
