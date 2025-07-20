<script lang="ts">
  import { JsonTreeView } from '@ark-ui/svelte/json-tree-view'
  import { ChevronRightIcon } from 'lucide-svelte'

  const data = [
    function sum(a: number, b: number) {
      return a + b
    },
    async (promises: Promise<any>[]) => await Promise.all(promises),
    function* generator(a: number) {
      while (a > 0) {
        yield a - 1
      }
    },
  ]
</script>

<JsonTreeView.Root {data}>
  <JsonTreeView.Tree>
    {#snippet arrow()}
      <ChevronRightIcon />
    {/snippet}
  </JsonTreeView.Tree>
</JsonTreeView.Root>
