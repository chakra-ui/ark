<script lang="ts">
  import { Popover } from '@ark-ui/svelte/popover'
</script>

<Popover.Root>
  <Popover.Trigger>Click Me</Popover.Trigger>
  <Popover.Positioner>
    <Popover.Arrow>
      <Popover.ArrowTip />
    </Popover.Arrow>
    <Popover.Content>
      <Popover.Title>Title</Popover.Title>
      <Popover.Description>Description</Popover.Description>
    </Popover.Content>
  </Popover.Positioner>
</Popover.Root>
