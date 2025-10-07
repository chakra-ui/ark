<script lang="ts">
  import { Collapsible } from '@ark-ui/svelte/collapsible'
  import { ChevronRightIcon } from 'lucide-svelte'

  let logs = $state<string[]>([])
</script>

<div>
  <Collapsible.Root onExitComplete={() => (logs = [...logs, `Exit complete at ${new Date().toLocaleTimeString()}`])}>
    <Collapsible.Trigger>
      Toggle (with exit callback)
      <Collapsible.Indicator>
        <ChevronRightIcon />
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content>This content has an exit callback</Collapsible.Content>
  </Collapsible.Root>

  {#if logs.length > 0}
    <div style="margin-top: 1rem;">
      <h4>Exit logs:</h4>
      <ul>
        {#each logs as log}
          <li>{log}</li>
        {/each}
      </ul>
    </div>
  {/if}
</div>
