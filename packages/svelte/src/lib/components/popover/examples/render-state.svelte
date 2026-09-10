<script lang="ts">
  import { Popover } from '@ark-ui/svelte/popover'
  import { ChevronDownIcon, ChevronUpIcon } from 'lucide-svelte'
</script>

<Popover.Root>
  <Popover.Trigger>
    {#snippet render(props, state)}
      <button type="button" {...props()}>
        {state.open ? 'Close' : 'Open'} Popover
        {#if state.open}
          <ChevronUpIcon />
        {:else}
          <ChevronDownIcon />
        {/if}
      </button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Positioner>
    <Popover.Content>Content</Popover.Content>
  </Popover.Positioner>
</Popover.Root>
