<script lang="ts">
  import { Tooltip, useTooltip } from '@ark-ui/svelte/tooltip'

  const tooltip = useTooltip({ id: 'tooltip-provider' })
</script>

<div>
  <button onclick={() => tooltip().setOpen(true)}>Open tooltip</button>
  <button onclick={() => tooltip().setOpen(false)}>Close tooltip</button>

  <Tooltip.RootProvider value={tooltip}>
    <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Content>I am a tooltip using root provider!</Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.RootProvider>
</div>
