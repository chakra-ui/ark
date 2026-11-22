<script lang="ts">
  import { JsonTreeView } from '@ark-ui/svelte/json-tree-view'
  import { ChevronRightIcon } from 'lucide-svelte'
  import styles from 'styles/json-tree-view.module.css'

  const data = Object.assign(new Error('Could not load user'), {
    stack: 'Error: Could not load user\n    at fetchUser (api.ts:12:9)\n    at loadProfile (profile.ts:4:3)',
  })
</script>

<JsonTreeView.Root class={styles.Root} {data} defaultExpandedDepth={1}>
  <JsonTreeView.Tree class={styles.Tree}>
    {#snippet arrow()}
      <ChevronRightIcon />
    {/snippet}
  </JsonTreeView.Tree>
</JsonTreeView.Root>
