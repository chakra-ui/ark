<script lang="ts">
  import { Tooltip } from '@ark-ui/svelte/tooltip'
</script>

<Tooltip.Root id="tooltip-timings" openDelay={1000} closeDelay={500}>
  <Tooltip.Trigger>Hover Me (Slow)</Tooltip.Trigger>
  <Tooltip.Positioner>
    <Tooltip.Content>I have custom timing! Open delay: 1s, Close delay: 0.5s</Tooltip.Content>
  </Tooltip.Positioner>
</Tooltip.Root>
