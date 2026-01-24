import { useAsyncList } from '@ark-ui/react/collection'
import { LoaderIcon } from 'lucide-react'
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
    <div className={styles.Root}>
      <div className={styles.Header}>
        <button className={button.Root} onClick={() => list.reload()} disabled={list.loading}>
          {list.loading ? (
            <>
              <LoaderIcon className={styles.Spinner} /> Loading
            </>
          ) : (
            'Reload Quotes'
          )}
        </button>
      </div>

      {list.error && <div className={styles.Error}>Error: {list.error.message}</div>}

      <div className={styles.ItemGroup}>
        {list.items.map((quote) => (
          <div key={quote.id} className={styles.Item}>
            <div className={styles.ItemContent}>
              <div className={styles.ItemDescription}>"{quote.quote}"</div>
              <div className={styles.ItemMeta}>— {quote.author}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
