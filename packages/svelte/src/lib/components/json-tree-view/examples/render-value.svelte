<script lang="ts">
  import { JsonTreeView } from '@ark-ui/svelte/json-tree-view'
  import { ChevronRightIcon } from 'lucide-svelte'
  import styles from 'styles/json-tree-view.module.css'

  const isEmail = (value: string) => {
    const strippedValue = value.replace(/^"(.*)"$/, '$1')
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(strippedValue)
  }
</script>

<JsonTreeView.Root
  class={styles.Root}
  defaultExpandedDepth={2}
  data={{
    name: 'John Doe',
    age: 30,
    number: Number.NaN,
    email: 'john.doe@example.com',
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
    {#snippet renderValue(node)}
      {#if node.type === 'text' && typeof node.value === 'string'}
        {#if isEmail(node.value)}
          <a href={`mailto:${node.value}`} target="_blank" rel="noreferrer">
            {node.value}
          </a>
        {:else}
          {node.value}
        {/if}
      {/if}
    {/snippet}
  </JsonTreeView.Tree>
</JsonTreeView.Root>
