<script setup lang="ts">
import { useAsyncList } from '@ark-ui/vue/collection'

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
  const currentSort = list.value.sortDescriptor
  let direction: 'ascending' | 'descending' = 'ascending'
  if (currentSort?.column === column && currentSort.direction === 'ascending') {
    direction = 'descending'
  }
  list.value.sort({ column, direction })
}

const getSortIcon = (column: keyof Product) => {
  const desc = list.value.sortDescriptor
  if (desc?.column !== column) return '↕️'
  return desc.direction === 'ascending' ? '↑' : '↓'
}
</script>

<template>
  <div>
    <div v-if="list.loading">Loading...</div>
    <div v-if="list.error">Error: {{ list.error.message }}</div>

    <button @click="handleSort('title')">Sort title {{ getSortIcon('title') }}</button>

    <div>
      <div v-for="product in list.items" :key="product.id">
        <div>{{ product.title }}</div>
        <div>${{ product.price }}</div>
        <div>{{ product.category }}</div>
        <div>{{ product.rating.rate }} ({{ product.rating.count }} reviews)</div>
      </div>
    </div>

    <div v-if="list.sortDescriptor">
      Sorted by {{ list.sortDescriptor.column }} ({{ list.sortDescriptor.direction }})
    </div>
  </div>
</template>
