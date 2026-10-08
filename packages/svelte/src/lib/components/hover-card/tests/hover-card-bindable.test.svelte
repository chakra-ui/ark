<script lang="ts">
  import { HoverCard } from '../index.ts'

  let triggerValue = $state<string | null>(null)
</script>

<HoverCard.Root bind:triggerValue openDelay={0}>
  <HoverCard.Trigger value="first">First</HoverCard.Trigger>
  <HoverCard.Trigger value="second">Second</HoverCard.Trigger>
  <HoverCard.Positioner>
    <HoverCard.Content>Content</HoverCard.Content>
  </HoverCard.Positioner>
</HoverCard.Root>
<output data-testid="trigger">{String(triggerValue)}</output>
