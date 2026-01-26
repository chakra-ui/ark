<script lang="ts">
  import { Toggle } from '@ark-ui/svelte/toggle'
  import { HeartIcon } from 'lucide-svelte'
  import styles from 'styles/toggle.module.css'

  let pressed = $state(false)
</script>

<Toggle.Root class={styles.Root} bind:pressed>
  <Toggle.Indicator class={styles.Indicator}>
    {#snippet fallback()}
      <HeartIcon />
    {/snippet}
    <HeartIcon fill="currentColor" />
  </Toggle.Indicator>
</Toggle.Root>
