<script lang="ts">
  import { Popover } from '@ark-ui/svelte/popover'
</script>

<Popover.Root>
  <Popover.Trigger>
    {#snippet asChild(props)}
      <button {...props()}>Open Popover</button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Positioner>
    <Popover.Content>Content</Popover.Content>
  </Popover.Positioner>
</Popover.Root>
