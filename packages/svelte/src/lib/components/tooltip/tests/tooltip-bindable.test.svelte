<script lang="ts">
  import { Tooltip } from '../index.ts'

  let triggerValue = $state<string | null>(null)
</script>

<Tooltip.Root bind:triggerValue openDelay={0}>
  <Tooltip.Trigger value="first">First</Tooltip.Trigger>
  <Tooltip.Trigger value="second">Second</Tooltip.Trigger>
  <Tooltip.Positioner>
    <Tooltip.Content>Content</Tooltip.Content>
  </Tooltip.Positioner>
</Tooltip.Root>
<output data-testid="trigger">{String(triggerValue)}</output>
