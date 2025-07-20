<script lang="ts">
  import { JsonTreeView } from '@ark-ui/svelte/json-tree-view'
  import { ChevronRightIcon } from 'lucide-svelte'

  const data = {
    regex: /^[a-z0-9]+/g,
    case_insensitive: /^(?:[a-z0-9]+)foo.*?/i,
  }
</script>

<JsonTreeView.Root {data}>
  <JsonTreeView.Tree>
    {#snippet arrow()}
      <ChevronRightIcon />
    {/snippet}
  </JsonTreeView.Tree>
</JsonTreeView.Root>
