<script lang="ts">
  import { Toggle } from '@ark-ui/svelte/toggle'
  import { BoldIcon } from 'lucide-svelte'
  import styles from 'styles/toggle.module.css'
</script>

<Toggle.Root class={styles.Root}>
  <BoldIcon />
  <Toggle.Context>
    {#snippet render(context)}
      <span>{context().pressed ? 'On' : 'Off'}</span>
    {/snippet}
  </Toggle.Context>
</Toggle.Root>
