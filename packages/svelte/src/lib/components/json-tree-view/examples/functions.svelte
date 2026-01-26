<script lang="ts">
  import { JsonTreeView } from '@ark-ui/svelte/json-tree-view'
  import { ChevronRightIcon } from 'lucide-svelte'
  import styles from 'styles/json-tree-view.module.css'

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

<JsonTreeView.Root defaultExpandedDepth={1} class={styles.Root} {data}>
  <JsonTreeView.Tree class={styles.Tree}>
    {#snippet arrow()}
      <ChevronRightIcon />
    {/snippet}
  </JsonTreeView.Tree>
</JsonTreeView.Root>
