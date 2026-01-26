<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  import { Tooltip } from '@ark-ui/svelte/tooltip'
  import styles from 'styles/tooltip.module.css'
</script>

<Tooltip.Root>
  <Tooltip.Trigger class={styles.Trigger}>Hover Me</Tooltip.Trigger>
  <Portal>
    <Tooltip.Positioner>
      <Tooltip.Context>
        {#snippet render(context)}
          <Tooltip.Content class={styles.Content}>
            This tooltip is open: {context().open.toString()}
          </Tooltip.Content>
        {/snippet}
      </Tooltip.Context>
    </Tooltip.Positioner>
  </Portal>
</Tooltip.Root>
