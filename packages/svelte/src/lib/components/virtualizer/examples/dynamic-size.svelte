<script lang="ts">
  import { ListVirtualizer, useListVirtualizer } from '@ark-ui/svelte/virtualizer'
  import styles from 'styles/virtualizer.module.css'

  const items = Array.from({ length: 10000 }, (_, index) => ({
    title: `Item ${index + 1}`,
    lines: Array.from({ length: (index % 4) + 1 }, (_, line) => `Line ${line + 1} of item ${index + 1}`),
  }))

  const virtualizer = useListVirtualizer(() => ({
    count: items.length,
    estimatedSize: () => 64,
  }))
</script>

<ListVirtualizer.Root value={virtualizer} class={styles.Root}>
  <ListVirtualizer.Content>
    {#each virtualizer.getVirtualItems() as item (item.key)}
      <ListVirtualizer.Item {item} measure class={`${styles.ItemDynamic} ${item.index % 2 ? styles.ItemAlt : ''}`}>
        <strong>{items[item.index].title}</strong>
        {#each items[item.index].lines as line (line)}
          <p>{line}</p>
        {/each}
      </ListVirtualizer.Item>
    {/each}
  </ListVirtualizer.Content>
</ListVirtualizer.Root>
