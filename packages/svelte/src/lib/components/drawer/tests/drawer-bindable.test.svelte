<script lang="ts">
  import type { SnapPoint } from '@zag-js/drawer'
  import { Drawer } from '../index.ts'

  let triggerValue = $state<string | null>(null)
  let snapPoint = $state<SnapPoint | null>(0.5)
</script>

<Drawer.Root snapPoints={[0.5, 1]} bind:triggerValue bind:snapPoint>
  <Drawer.Trigger value="first">First</Drawer.Trigger>
  <Drawer.Trigger value="second">Second</Drawer.Trigger>
  <Drawer.Positioner>
    <Drawer.Content>Content</Drawer.Content>
  </Drawer.Positioner>
  <Drawer.Context>
    {#snippet render(drawer)}
      <button type="button" onclick={() => drawer().setSnapPoint(1)}>snap</button>
    {/snippet}
  </Drawer.Context>
</Drawer.Root>
<output data-testid="trigger">{String(triggerValue)}</output>
<output data-testid="snap-point">{String(snapPoint)}</output>
