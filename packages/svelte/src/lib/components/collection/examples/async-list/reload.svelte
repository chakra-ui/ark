<script lang="ts">
  import { useAsyncList } from '@ark-ui/svelte/collection'

  interface Quote {
    id: number
    quote: string
    author: string
  }

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
</script>

<div>
  <div>
    <button onclick={() => list().reload()} disabled={list().loading}>
      {list().loading ? 'Loading...' : 'Reload Quotes'}
    </button>
  </div>

  {#if list().error}
    <div>Error: {list().error.message}</div>
  {/if}

  <div>
    {#each list().items as quote}
      <div>
        <div>"{quote.quote}"</div>
        <div>— {quote.author}</div>
      </div>
    {/each}
  </div>
</div>
