import { useAsyncList } from '@ark-ui/solid/collection'
import { ListVirtualizer, useListVirtualizer } from '@ark-ui/solid/virtualizer'
import { For, createEffect } from 'solid-js'
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

  const virtualizer = useListVirtualizer(() => ({ count: list().items.length, estimatedSize: () => 48 }))

  const nearEnd = () => {
    const items = virtualizer.getVirtualItems()
    return (items[items.length - 1]?.index ?? 0) >= list().items.length - 10
  }

  createEffect(
    () => [nearEnd(), list().isLoading, list().cursor] as const,
    ([near, loading, cursor]) => {
      if (near && !loading && cursor !== undefined) list().loadMore()
    },
  )

  return (
    <div class="stack">
      <ListVirtualizer.Root value={virtualizer} class={styles.Root}>
        <ListVirtualizer.Content>
          <For each={virtualizer.getVirtualItems()} keyed={false}>
            {(item) => (
              <ListVirtualizer.Item item={item()} class={`${styles.Item} ${item().index % 2 ? styles.ItemAlt : ''}`}>
                {list().items[item().index]}
              </ListVirtualizer.Item>
            )}
          </For>
        </ListVirtualizer.Content>
      </ListVirtualizer.Root>
      <output class={styles.Meta}>
        {list().isLoading ? 'Loading more…' : `${list().items.length} of ${TOTAL} loaded`}
      </output>
    </div>
  )
}
