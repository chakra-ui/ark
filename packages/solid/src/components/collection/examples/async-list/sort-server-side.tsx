import { useAsyncList } from '@ark-ui/solid/collection'
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon, LoaderIcon } from 'lucide-solid'
import { For } from 'solid-js'
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

export const SortServerSide = () => {
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

  const getSortIcon = (column: keyof Product) => {
    const desc = list().sortDescriptor
    if (desc?.column !== column) return <ArrowUpDownIcon />
    return desc.direction === 'ascending' ? <ArrowUpIcon /> : <ArrowDownIcon />
  }

  return (
    <div class={styles.Root}>
      <div class={styles.Header}>
        <button class={button.Root} onClick={() => handleSort('title')}>
          Sort by title {getSortIcon('title')}
        </button>
        {list().loading && (
          <span class={styles.Loading}>
            <LoaderIcon class={styles.Spinner} /> Loading
          </span>
        )}
      </div>

      {list().error && <div class={styles.Error}>Error: {list().error.message}</div>}

      <div class={styles.ItemGroup}>
        <For each={list().items}>
          {(product) => (
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
          )}
        </For>
      </div>
    </div>
  )
}
