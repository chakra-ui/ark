<script lang="ts">
  import { Popover, usePopover } from '@ark-ui/svelte/popover'

  const popover = usePopover({
    positioning: {
      placement: 'bottom-start',
    },
  })
</script>

<button onclick={() => popover().setOpen(true)}>
  Popover is {popover().open ? 'open' : 'closed'}
</button>

<Popover.RootProvider value={popover}>
  <Popover.Positioner>
    <Popover.Content>
      <Popover.Title>Title</Popover.Title>
      <Popover.Description>Description</Popover.Description>
    </Popover.Content>
  </Popover.Positioner>
</Popover.RootProvider>
