<script lang="ts">
  import { Tooltip } from '../index.ts'
</script>

<Tooltip.Root id="custom" openDelay={0}>
  <Tooltip.Trigger>Hover me</Tooltip.Trigger>
  <Tooltip.Positioner>
    <Tooltip.Content>Content</Tooltip.Content>
  </Tooltip.Positioner>
</Tooltip.Root>
