<script lang="ts">
  import { HoverCard } from '@ark-ui/svelte/hover-card'
  import { Portal } from '@ark-ui/svelte/portal'
</script>

<HoverCard.Root>
  <HoverCard.Context>
    {#snippet render(hoverCard)}
      <HoverCard.Trigger>Hover me {hoverCard().open ? '▲' : '▼'}</HoverCard.Trigger>
    {/snippet}
  </HoverCard.Context>
  <Portal>
    <HoverCard.Positioner>
      <HoverCard.Content>
        <HoverCard.Arrow>
          <HoverCard.ArrowTip />
        </HoverCard.Arrow>
        Content
      </HoverCard.Content>
    </HoverCard.Positioner>
  </Portal>
</HoverCard.Root>
