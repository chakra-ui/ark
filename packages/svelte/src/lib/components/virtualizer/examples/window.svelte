<script lang="ts">
  import { WindowVirtualizer, useWindowVirtualizer } from '@ark-ui/svelte/virtualizer'
  import styles from 'styles/virtualizer.module.css'

  const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`)

  const virtualizer = useWindowVirtualizer({
    count: items.length,
    estimatedSize: () => 48,
  })
</script>

<WindowVirtualizer.Root value={virtualizer} class={styles.Window}>
  <WindowVirtualizer.Content>
    {#each virtualizer.getVirtualItems() as item (item.key)}
      <WindowVirtualizer.Item {item} class={`${styles.Item} ${item.index % 2 ? styles.ItemAlt : ''}`}>
        {items[item.index]}
      </WindowVirtualizer.Item>
    {/each}
  </WindowVirtualizer.Content>
</WindowVirtualizer.Root>
