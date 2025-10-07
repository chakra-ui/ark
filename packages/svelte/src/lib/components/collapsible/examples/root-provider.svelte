<script lang="ts">
  import { Collapsible, useCollapsible } from '@ark-ui/svelte/collapsible'
  import { ChevronRightIcon } from 'lucide-svelte'

  const id = $props.id()
  const collapsible = useCollapsible({ id })
</script>

<div>
  <button onclick={() => collapsible().setOpen(true)}>Open</button>
  <button onclick={() => collapsible().setOpen(false)}>Close</button>
  
  <Collapsible.RootProvider value={collapsible}>
    <Collapsible.Trigger>
      Toggle (with external control)
      <Collapsible.Indicator>
        <ChevronRightIcon />
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content>This collapsible is controlled externally</Collapsible.Content>
  </Collapsible.RootProvider>
</div> 
