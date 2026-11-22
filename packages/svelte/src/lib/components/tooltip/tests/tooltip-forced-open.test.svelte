<script lang="ts">
  import { Tooltip } from '$lib/components/tooltip'

  let requested = $state(false)
  const forced = true
</script>

<output data-testid="requested">{String(requested)}</output>
<Tooltip.Root bind:open={() => requested || forced, (value) => (requested = value)} openDelay={0}>
  <Tooltip.Trigger>Hover me</Tooltip.Trigger>
  <Tooltip.Positioner>
    <Tooltip.Content>Tooltip text</Tooltip.Content>
  </Tooltip.Positioner>
</Tooltip.Root>
