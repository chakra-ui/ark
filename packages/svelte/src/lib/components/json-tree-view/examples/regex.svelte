<script lang="ts">
  import { JsonTreeView } from '@ark-ui/svelte/json-tree-view'
  import { ChevronRightIcon } from 'lucide-svelte'
  import styles from 'styles/json-tree-view.module.css'

  const data = {
    regex: /^[a-z0-9]+/g,
    case_insensitive: /^(?:[a-z0-9]+)foo.*?/i,
  }
</script>

<JsonTreeView.Root defaultExpandedDepth={1} class={styles.Root} {data}>
  <JsonTreeView.Tree class={styles.Tree}>
    {#snippet arrow()}
      <ChevronRightIcon />
    {/snippet}
  </JsonTreeView.Tree>
</JsonTreeView.Root>
