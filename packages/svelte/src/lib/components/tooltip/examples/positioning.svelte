<script lang="ts">
  import { Tooltip } from '@ark-ui/svelte/tooltip'
</script>

<div style="display: flex; gap: 1rem; justify-content: center; margin: 2rem;">
  <Tooltip.Root id="tooltip-top" positioning={{ placement: 'top' }}>
    <Tooltip.Trigger>Top</Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Content>Tooltip on top</Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.Root>

  <Tooltip.Root id="tooltip-bottom" positioning={{ placement: 'bottom' }}>
    <Tooltip.Trigger>Bottom</Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Content>Tooltip on bottom</Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.Root>

  <Tooltip.Root id="tooltip-left" positioning={{ placement: 'left' }}>
    <Tooltip.Trigger>Left</Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Content>Tooltip on left</Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.Root>

  <Tooltip.Root id="tooltip-right" positioning={{ placement: 'right' }}>
    <Tooltip.Trigger>Right</Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Content>Tooltip on right</Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.Root>
</div>
