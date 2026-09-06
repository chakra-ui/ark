<script lang="ts">
  import { ListVirtualizer, useListVirtualizer } from '@ark-ui/svelte/virtualizer'
  import styles from 'styles/virtualizer.module.css'

  const items = Array.from({ length: 10000 }, (_, index) => `${index + 1}`)

  const virtualizer = useListVirtualizer({
    count: items.length,
    orientation: 'horizontal',
    estimatedSize: () => 80,
  })
</script>

<ListVirtualizer.Root value={virtualizer} class={styles.RootHorizontal}>
  <ListVirtualizer.Content>
    {#each virtualizer.getVirtualItems() as item (item.key)}
      <ListVirtualizer.Item {item} class={`${styles.ItemHorizontal} ${item.index % 2 ? styles.ItemAlt : ''}`}>
        {items[item.index]}
      </ListVirtualizer.Item>
    {/each}
  </ListVirtualizer.Content>
</ListVirtualizer.Root>
