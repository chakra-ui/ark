<script lang="ts">
  import { Tooltip } from '@ark-ui/svelte/tooltip'
</script>

<Tooltip.Root id="tooltip">
  <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
  <Tooltip.Positioner>
    <Tooltip.Content>I am a tooltip!</Tooltip.Content>
  </Tooltip.Positioner>
</Tooltip.Root>
