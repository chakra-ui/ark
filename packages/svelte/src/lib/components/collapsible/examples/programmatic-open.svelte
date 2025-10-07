<script lang="ts">
  import { Collapsible, useCollapsible } from '@ark-ui/svelte/collapsible'
  import { ChevronRight } from 'lucide-svelte'

  const collapsible = useCollapsible()
</script>

<div>
  <p>
    Open: <strong>{String(collapsible().open)}</strong>
  </p>
  <p>
    Visible: <strong>{String(collapsible().visible)}</strong>
  </p>
</div>

<div style="display: flex; gap: 8px; margin-top: 8px">
  <button type="button" onclick={() => collapsible().setOpen(true)}>Open</button>
  <button type="button" onclick={() => collapsible().setOpen(false)}>Close</button>
</div>

<Collapsible.RootProvider value={collapsible}>
  <Collapsible.Trigger>
    Toggle
    <Collapsible.Indicator>
      <ChevronRight />
    </Collapsible.Indicator>
  </Collapsible.Trigger>
  <Collapsible.Content>Content</Collapsible.Content>
</Collapsible.RootProvider>
