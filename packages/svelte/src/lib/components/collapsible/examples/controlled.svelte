<script lang="ts">
  import { Collapsible } from '@ark-ui/svelte/collapsible'
  import { ChevronRightIcon } from 'lucide-svelte'

  let open = $state(false)
</script>

<div>
  <pre>{JSON.stringify({ open }, null, 2)}</pre>

  <button onclick={() => (open = !open)}>External Toggle</button>

  <Collapsible.Root bind:open>
    <Collapsible.Trigger>
      Toggle (controlled: {open ? 'open' : 'closed'})
      <Collapsible.Indicator>
        <ChevronRightIcon />
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content>This collapsible is controlled with bind:open</Collapsible.Content>
  </Collapsible.Root>
</div>
