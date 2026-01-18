<script lang="ts">
  import { useAsyncList } from '@ark-ui/svelte/collection'
  import { LoaderIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/async-list.module.css'

  interface Quote {
    id: number
    quote: string
    author: string
  }

  const list = useAsyncList<Quote>({
    async load() {
      const response = await fetch(`https://dummyjson.com/quotes?limit=4&skip=${Math.floor(Math.random() * 50)}`)

      if (!response.ok) {
        throw new Error('Failed to fetch quotes')
      }

      const data = await response.json()
      return { items: data.quotes }
    },
  })
</script>

<div class={styles.Root}>
  <div class={styles.Header}>
    <button class={button.Root} onclick={() => list().reload()} disabled={list().loading}>
      {#if list().loading}
        <LoaderIcon class={styles.Spinner} /> Loading
      {:else}
        Reload Quotes
      {/if}
    </button>
  </div>

  {#if list().error}
    <div class={styles.Error}>Error: {list().error.message}</div>
  {/if}

  <div class={styles.ItemGroup}>
    {#each list().items as quote}
      <div class={styles.Item}>
        <div class={styles.ItemContent}>
          <div class={styles.ItemDescription}>"{quote.quote}"</div>
          <div class={styles.ItemMeta}>— {quote.author}</div>
        </div>
      </div>
    {/each}
  </div>
</div>
