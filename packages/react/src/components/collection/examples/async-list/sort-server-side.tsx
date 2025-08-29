import { useAsyncList } from '@ark-ui/react/collection'

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
    if (desc?.column !== column) return '↕️'
    return desc.direction === 'ascending' ? '↑' : '↓'
  }

  return (
    <div>
      {list.loading && <div>Loading...</div>}

      {list.error && <div>Error: {list.error.message}</div>}

      <button onClick={() => handleSort('title')}>Sort title {getSortIcon('title')}</button>

      <div>
        {list.items.map((product) => (
          <div key={product.id}>
            <div>{product.title}</div>
            <div>${product.price}</div>
            <div>{product.category}</div>
            <div>
              {product.rating.rate} ({product.rating.count} reviews)
            </div>
          </div>
        ))}
      </div>

      {list.sortDescriptor && (
        <div>
          Sorted by {list.sortDescriptor.column} ({list.sortDescriptor.direction})
        </div>
      )}
    </div>
  )
}
