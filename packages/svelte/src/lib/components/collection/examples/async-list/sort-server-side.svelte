<script lang="ts">
  import { useAsyncList } from '@ark-ui/svelte/collection'
  import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon, LoaderIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/async-list.module.css'

  interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
      rate: number
      count: number
    }
  }

  const list = useAsyncList<Product>({
    autoReload: true,
    async load({ sortDescriptor }) {
      const url = new URL('https://fakestoreapi.com/products')
      url.searchParams.set('limit', '5')
      if (sortDescriptor) {
        const { direction } = sortDescriptor
        url.searchParams.set('sort', direction === 'ascending' ? 'asc' : 'desc')
      }
      const response = await fetch(url)
      const items = await response.json()
      return { items }
    },
  })

  const handleSort = (column: keyof Product) => {
    const currentSort = list().sortDescriptor
    let direction: 'ascending' | 'descending' = 'ascending'
    if (currentSort?.column === column && currentSort.direction === 'ascending') {
      direction = 'descending'
    }
    list().sort({ column, direction })
  }
</script>

<div class={styles.Root}>
  <div class={styles.Header}>
    <button class={button.Root} onclick={() => handleSort('title')}>
      Sort by title
      {#if list().sortDescriptor?.column === 'title'}
        {#if list().sortDescriptor?.direction === 'ascending'}
          <ArrowUpIcon />
        {:else}
          <ArrowDownIcon />
        {/if}
      {:else}
        <ArrowUpDownIcon />
      {/if}
    </button>
    {#if list().loading}
      <span class={styles.Loading}>
        <LoaderIcon class={styles.Spinner} /> Loading
      </span>
    {/if}
  </div>

  {#if list().error}
    <div class={styles.Error}>Error: {list().error.message}</div>
  {/if}

  <div class={styles.ItemGroup}>
    {#each list().items as product}
      <div class={styles.Item} data-variant="outline">
        <div class={styles.ItemMedia}>
          <img src={product.image} alt={product.title} />
        </div>
        <div class={styles.ItemContent}>
          <div class={styles.ItemTitle}>{product.title}</div>
          <div class={styles.ItemDescription}>${product.price}</div>
          <div class={styles.ItemMeta}>
            {product.category} • {product.rating.rate} ({product.rating.count} reviews)
          </div>
        </div>
      </div>
    {/each}
  </div>

  {#if list().sortDescriptor}
    <div class={styles.Status}>
      Sorted by {list().sortDescriptor?.column} ({list().sortDescriptor?.direction})
    </div>
  {/if}
</div>
