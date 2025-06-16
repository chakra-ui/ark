<script lang="ts">
  import { HoverCard } from '@ark-ui/svelte/hover-card'

  let open = $state(false)
</script>

<p>Open: {open ? 'true' : 'false'}</p>

<HoverCard.Root bind:open>
  <HoverCard.Trigger>Hover me</HoverCard.Trigger>
  <HoverCard.Positioner>
    <HoverCard.Content>
      <HoverCard.Arrow>
        <HoverCard.ArrowTip />
      </HoverCard.Arrow>
      Content
    </HoverCard.Content>
  </HoverCard.Positioner>
</HoverCard.Root>
