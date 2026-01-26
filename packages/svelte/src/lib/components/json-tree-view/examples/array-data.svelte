<script lang="ts">
  import { JsonTreeView } from '@ark-ui/svelte/json-tree-view'
  import { ChevronRightIcon } from 'lucide-svelte'
  import styles from 'styles/json-tree-view.module.css'

  const testArray = [1, 2, 3, 4, 5]
  Object.defineProperties(testArray, {
    customProperty: { value: 'custom value', enumerable: false, writable: false },
    anotherProperty: { value: 42, enumerable: false, writable: false },
  })
</script>

<JsonTreeView.Root
  defaultExpandedDepth={1}
  class={styles.Root}
  data={{
    normalArray: [1, 2, 3],
    arrayWithNonEnumerableProperties: testArray,
    sparseArray: (() => {
      const sparse = []
      sparse[0] = 'first'
      sparse[5] = 'sixth'
      return sparse
    })(),
  }}
>
  <JsonTreeView.Tree class={styles.Tree}>
    {#snippet arrow()}
      <ChevronRightIcon />
    {/snippet}
  </JsonTreeView.Tree>
</JsonTreeView.Root>
