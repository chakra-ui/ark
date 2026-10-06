<script lang="ts">
  import { Popover } from '@ark-ui/svelte/popover'

  const props: Popover.RootProps = $props()
</script>

<Popover.Root {...props}>
  <Popover.Trigger>click me</Popover.Trigger>
  <Popover.Positioner data-testid="positioner">
    <Popover.Content>
      <Popover.Title>title</Popover.Title>
      <Popover.Description>description</Popover.Description>
      <Popover.CloseTrigger>close</Popover.CloseTrigger>
    </Popover.Content>
  </Popover.Positioner>
</Popover.Root>
