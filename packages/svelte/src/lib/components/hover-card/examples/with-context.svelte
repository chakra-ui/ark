<script lang="ts">
  import { HoverCard } from '@ark-ui/svelte/hover-card'
</script>

<HoverCard.Root>
  <HoverCard.Trigger>
    Hover me
    <HoverCard.Context>
      {#snippet render(hoverCard)}
        {hoverCard().open ? '▲' : '▼'}
      {/snippet}
    </HoverCard.Context>
  </HoverCard.Trigger>
  <HoverCard.Positioner>
    <HoverCard.Content>
      <HoverCard.Arrow>
        <HoverCard.ArrowTip />
      </HoverCard.Arrow>
      Content
    </HoverCard.Content>
  </HoverCard.Positioner>
</HoverCard.Root>
