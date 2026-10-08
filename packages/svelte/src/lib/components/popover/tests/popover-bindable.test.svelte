<script lang="ts">
  import { Popover } from '../index.ts'

  let triggerValue = $state<string | null>(null)
</script>

<Popover.Root bind:triggerValue>
  <Popover.Trigger value="first">First</Popover.Trigger>
  <Popover.Trigger value="second">Second</Popover.Trigger>
  <Popover.Positioner>
    <Popover.Content>Content</Popover.Content>
  </Popover.Positioner>
</Popover.Root>
<output data-testid="trigger">{String(triggerValue)}</output>
