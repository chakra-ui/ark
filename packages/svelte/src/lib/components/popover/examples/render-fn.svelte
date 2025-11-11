<script lang="ts">
  import { Popover } from '@ark-ui/svelte/popover'
</script>

<Popover.Root>
  <Popover.Trigger>Click Me</Popover.Trigger>
  <Popover.Positioner>
    <Popover.Context>
      {#snippet render(popover)}
        <Popover.Content>
          <Popover.Title>Title</Popover.Title>
          <Popover.Description>Description: {popover().open.toString()}</Popover.Description>
          <Popover.CloseTrigger>Close</Popover.CloseTrigger>
        </Popover.Content>
      {/snippet}
    </Popover.Context>
  </Popover.Positioner>
</Popover.Root>
