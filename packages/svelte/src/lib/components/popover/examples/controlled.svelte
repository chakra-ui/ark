<script lang="ts">
  import { Popover } from '@ark-ui/svelte/popover'

  let open = $state(false)
</script>

<button type="button" onclick={() => (open = !open)}>Toggle</button>
<Popover.Root bind:open closeOnInteractOutside={false}>
  <Popover.Anchor>Anchor</Popover.Anchor>
  <Popover.Positioner>
    <Popover.Content>
      <Popover.Title>Title</Popover.Title>
      <Popover.Description>Description</Popover.Description>
      <Popover.CloseTrigger>Close</Popover.CloseTrigger>
    </Popover.Content>
  </Popover.Positioner>
</Popover.Root>
