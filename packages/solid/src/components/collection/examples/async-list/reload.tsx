import { useAsyncList } from '@ark-ui/solid/collection'
import { LoaderIcon } from 'lucide-solid'
import { For } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/async-list.module.css'

interface Quote {
  id: number
  quote: string
  author: string
}

export const Reload = () => {
  const list = useAsyncList<Quote>({
    autoReload: true,
    async load() {
      const response = await fetch(`https://dummyjson.com/quotes?limit=4&skip=${Math.floor(Math.random() * 50)}`)

      if (!response.ok) {
        throw new Error('Failed to fetch quotes')
      }

      const data = await response.json()
      return { items: data.quotes }
    },
  })

  return (
    <div class={styles.Root}>
      <div class={styles.Header}>
        <button class={button.Root} onClick={() => list().reload()} disabled={list().loading}>
          {list().loading ? (
            <>
              <LoaderIcon class={styles.Spinner} /> Loading
            </>
          ) : (
            'Reload Quotes'
          )}
        </button>
      </div>

      {list().error && <div class={styles.Error}>Error: {list().error.message}</div>}

      <div class={styles.ItemGroup}>
        <For each={list().items}>
          {(quote) => (
            <div class={styles.Item}>
              <div class={styles.ItemContent}>
                <div class={styles.ItemDescription}>"{quote.quote}"</div>
                <div class={styles.ItemMeta}>— {quote.author}</div>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  )
}
