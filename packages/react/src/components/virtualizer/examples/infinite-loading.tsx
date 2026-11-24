import { useAsyncList } from '@ark-ui/react/collection'
import { ListVirtualizer, useListVirtualizer } from '@ark-ui/react/virtualizer'
import { useEffect, useLayoutEffect } from 'react'
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

export const InfiniteLoading = () => {
  const list = useAsyncList<string>({ autoReload: true, load: loadPage })

  const virtualizer = useListVirtualizer({ count: list.items.length, estimatedSize: () => 48 })
  const count = list.items.length
  useLayoutEffect(() => {
    virtualizer.updateOptions({ count })
  }, [virtualizer, count])

  const virtualItems = virtualizer.getVirtualItems()
  const lastIndex = virtualItems[virtualItems.length - 1]?.index ?? 0
  const nearEnd = lastIndex >= list.items.length - 10

  useEffect(() => {
    if (nearEnd && list.cursor !== undefined && !list.isLoading) list.loadMore()
  }, [nearEnd, list])

  return (
    <div className="stack">
      <ListVirtualizer.Root value={virtualizer} className={styles.Root}>
        <ListVirtualizer.Content>
          {virtualItems.map((item) => (
            <ListVirtualizer.Item
              key={item.key}
              item={item}
              className={`${styles.Item} ${item.index % 2 ? styles.ItemAlt : ''}`}
            >
              {list.items[item.index]}
            </ListVirtualizer.Item>
          ))}
        </ListVirtualizer.Content>
      </ListVirtualizer.Root>
      <output className={styles.Meta}>
        {list.isLoading ? 'Loading more…' : `${list.items.length} of ${TOTAL} loaded`}
      </output>
    </div>
  )
}
