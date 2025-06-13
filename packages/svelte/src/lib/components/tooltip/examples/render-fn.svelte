<script lang="ts">
  import { Tooltip } from '@ark-ui/svelte/tooltip'
</script>

<Tooltip.Root id="tooltip-render-fn">
  <Tooltip.Trigger>Hover for dynamic content</Tooltip.Trigger>
  <Tooltip.Positioner>
    <Tooltip.Content>
      Current time: {new Date().toLocaleTimeString()}
    </Tooltip.Content>
  </Tooltip.Positioner>
</Tooltip.Root>
