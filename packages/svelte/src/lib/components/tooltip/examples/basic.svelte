<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  import { Tooltip } from '@ark-ui/svelte/tooltip'
  import styles from 'styles/tooltip.module.css'
</script>

<Tooltip.Root>
  <Tooltip.Trigger class={styles.Trigger}>Hover Me</Tooltip.Trigger>
  <Portal>
    <Tooltip.Positioner>
      <Tooltip.Content class={styles.Content}>I am a tooltip!</Tooltip.Content>
    </Tooltip.Positioner>
  </Portal>
</Tooltip.Root>
