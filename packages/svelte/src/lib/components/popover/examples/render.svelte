<script lang="ts">
  import { Popover } from '@ark-ui/svelte/popover'
</script>

<Popover.Root>
  <Popover.Trigger>
    {#snippet render(props)}
      <button type="button" {...props()}>Open Popover</button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Positioner>
    <Popover.Content>Content</Popover.Content>
  </Popover.Positioner>
</Popover.Root>
