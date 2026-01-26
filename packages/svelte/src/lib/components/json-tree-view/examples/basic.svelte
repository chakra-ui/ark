<script lang="ts">
  import { JsonTreeView } from '@ark-ui/svelte/json-tree-view'
  import { ChevronRightIcon } from 'lucide-svelte'
  import styles from 'styles/json-tree-view.module.css'
</script>

<JsonTreeView.Root
  defaultExpandedDepth={1}
  class={styles.Root}
  data={{
    name: 'John Doe',
    age: 30,
    email: 'john.doe@example.com',
    tags: ['tag1', 'tag2', 'tag3'],
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
    },
  }}
>
  <JsonTreeView.Tree class={styles.Tree}>
    {#snippet arrow()}
      <ChevronRightIcon />
    {/snippet}
  </JsonTreeView.Tree>
</JsonTreeView.Root>
