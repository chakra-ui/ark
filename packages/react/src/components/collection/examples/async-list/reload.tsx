import { useAsyncList } from '@ark-ui/react/collection'

interface Quote {
  id: number
  quote: string
  author: string
}

export const Reload = () => {
  const list = useAsyncList<Quote>({
    async load() {
      const response = await fetch(`https://dummyjson.com/quotes?limit=5&skip=${Math.floor(Math.random() * 50)}`)

      if (!response.ok) {
        throw new Error('Failed to fetch quotes')
      }

      const data = await response.json()
      return { items: data.quotes }
    },
  })

  return (
    <div>
      <div>
        <button onClick={() => list.reload()} disabled={list.loading}>
          {list.loading ? 'Loading...' : 'Reload Quotes'}
        </button>
      </div>

      {list.error && <div>Error: {list.error.message}</div>}

      <div>
        {list.items.map((quote) => (
          <div key={quote.id}>
            <div>"{quote.quote}"</div>
            <div>— {quote.author}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
