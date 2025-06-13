<script lang="ts">
  import { Tooltip } from '@ark-ui/svelte/tooltip'

  let open = $state(false)
</script>

<div>
  <pre>{JSON.stringify({ open }, null, 2)}</pre>
  <button onclick={() => (open = !open)}>Toggle tooltip</button>

  <Tooltip.Root id="controlled-tooltip" bind:open>
    <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Content>I am a controlled tooltip!</Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.Root>
</div>
