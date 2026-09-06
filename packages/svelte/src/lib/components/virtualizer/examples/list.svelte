<script lang="ts">
  import { ListVirtualizer, useListVirtualizer } from '@ark-ui/svelte/virtualizer'
  import styles from 'styles/virtualizer.module.css'

  const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`)

  const virtualizer = useListVirtualizer({
    count: items.length,
    estimatedSize: () => 48,
  })
</script>

<ListVirtualizer.Root value={virtualizer} class={styles.Root}>
  <ListVirtualizer.Content>
    {#each virtualizer.getVirtualItems() as item (item.key)}
      <ListVirtualizer.Item {item} class={`${styles.Item} ${item.index % 2 ? styles.ItemAlt : ''}`}>
        {items[item.index]}
      </ListVirtualizer.Item>
    {/each}
  </ListVirtualizer.Content>
</ListVirtualizer.Root>
