<script lang="ts">
  import { useAsyncList } from '@ark-ui/svelte/collection'
  import { ListVirtualizer, useListVirtualizer } from '@ark-ui/svelte/virtualizer'
  import styles from 'styles/virtualizer.module.css'

  const PAGE_SIZE = 50
  const TOTAL = 500

  const loadPage = async ({ cursor }: { cursor?: string }) => {
    const start = Number(cursor ?? 0)
    await new Promise((resolve) => setTimeout(resolve, 600))
    const items = Array.from({ length: Math.min(PAGE_SIZE, TOTAL - start) }, (_, index) => `Item ${start + index + 1}`)
    const next = start + items.length
    return { items, cursor: next < TOTAL ? String(next) : undefined }
  }

  const list = useAsyncList<string>({ autoReload: true, load: loadPage })

  const virtualizer = useListVirtualizer(() => ({
    count: list().items.length,
    estimatedSize: () => 48,
    onRangeChange: ({ range }) => {
      const current = list()
      if (range.endIndex >= current.items.length - 10 && current.cursor !== undefined && !current.isLoading) {
        current.loadMore()
      }
    },
  }))
</script>

<div class="stack">
  <ListVirtualizer.Root value={virtualizer} class={styles.Root}>
    <ListVirtualizer.Content>
      {#each virtualizer.getVirtualItems() as item (item.key)}
        <ListVirtualizer.Item {item} class={`${styles.Item} ${item.index % 2 ? styles.ItemAlt : ''}`}>
          {list().items[item.index]}
        </ListVirtualizer.Item>
      {/each}
    </ListVirtualizer.Content>
  </ListVirtualizer.Root>
  <output class={styles.Meta}>
    {list().isLoading ? 'Loading more…' : `${list().items.length} of ${TOTAL} loaded`}
  </output>
</div>
