<script lang="ts">
  import { Collapsible } from '@ark-ui/svelte/collapsible'
</script>

<Collapsible.Root>
  <Collapsible.Trigger>
    {#snippet render(props, state)}
      <button type="button" {...props()} data-testid="trigger">{state.open ? 'Open' : 'Closed'}</button>
    {/snippet}
  </Collapsible.Trigger>
  <Collapsible.Content>Content</Collapsible.Content>
</Collapsible.Root>
