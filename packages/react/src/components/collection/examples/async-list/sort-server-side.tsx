import { useAsyncList } from '@ark-ui/react/collection'
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon, LoaderIcon } from 'lucide-react'
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
    const currentSort = list.sortDescriptor
    let direction: 'ascending' | 'descending' = 'ascending'
    if (currentSort?.column === column && currentSort.direction === 'ascending') {
      direction = 'descending'
    }
    list.sort({ column, direction })
  }

  const getSortIcon = (column: keyof Product) => {
    const desc = list.sortDescriptor
    if (desc?.column !== column) return <ArrowUpDownIcon />
    return desc.direction === 'ascending' ? <ArrowUpIcon /> : <ArrowDownIcon />
  }

  return (
    <div className={styles.Root}>
      <div className={styles.Header}>
        <button className={button.Root} onClick={() => handleSort('title')}>
          Sort by title {getSortIcon('title')}
        </button>
        {list.loading && (
          <span className={styles.Loading}>
            <LoaderIcon className={styles.Spinner} /> Loading
          </span>
        )}
      </div>

      {list.error && <div className={styles.Error}>Error: {list.error.message}</div>}

      <div className={styles.ItemGroup}>
        {list.items.map((product) => (
          <div key={product.id} className={styles.Item} data-variant="outline">
            <div className={styles.ItemMedia}>
              <img src={product.image} alt={product.title} />
            </div>
            <div className={styles.ItemContent}>
              <div className={styles.ItemTitle}>{product.title}</div>
              <div className={styles.ItemDescription}>${product.price}</div>
              <div className={styles.ItemMeta}>
                {product.category} • {product.rating.rate} ({product.rating.count} reviews)
              </div>
            </div>
          </div>
        ))}
      </div>

      {list.sortDescriptor && (
        <div className={styles.Status}>
          Sorted by {list.sortDescriptor.column} ({list.sortDescriptor.direction})
        </div>
      )}
    </div>
  )
}
