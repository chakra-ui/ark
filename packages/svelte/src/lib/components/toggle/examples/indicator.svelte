<script lang="ts">
  import { Toggle } from '@ark-ui/svelte/toggle'
  import { HeartIcon } from 'lucide-svelte'
  import styles from 'styles/toggle.module.css'
</script>

<Toggle.Root class={styles.Root}>
  <Toggle.Indicator class={styles.Indicator}>
    {#snippet fallback()}
      <HeartIcon />
    {/snippet}
    <HeartIcon fill="currentColor" />
  </Toggle.Indicator>
</Toggle.Root>
