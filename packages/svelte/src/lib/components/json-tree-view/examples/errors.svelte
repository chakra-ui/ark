<script lang="ts">
  import { JsonTreeView } from '@ark-ui/svelte/json-tree-view'
  import { ChevronRightIcon } from 'lucide-svelte'

  const data = new Error('Error')
</script>

<JsonTreeView.Root {data}>
  <JsonTreeView.Tree>
    {#snippet arrow()}
      <ChevronRightIcon />
    {/snippet}
  </JsonTreeView.Tree>
</JsonTreeView.Root>
