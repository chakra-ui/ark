<script lang="ts">
  import { HoverCard, useHoverCard } from '@ark-ui/svelte/hover-card'
  import { Portal } from '@ark-ui/svelte/portal'

  const id = $props.id()
  const hoverCard = useHoverCard({ id })
</script>

<button type="button" onclick={() => hoverCard().setOpen(true)}>Open</button>

<HoverCard.RootProvider value={hoverCard}>
  <HoverCard.Trigger>Hover me</HoverCard.Trigger>
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
</HoverCard.RootProvider>
