<script lang="ts">
  import { Popover } from '@ark-ui/svelte/popover'
</script>

<Popover.Root>
  <Popover.Trigger>
    {#snippet asChild(props)}
      <button type="button" {...props()}>Open</button>
    {/snippet}
  </Popover.Trigger>
</Popover.Root>
