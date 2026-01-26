<script setup lang="ts">
import { useAsyncList } from '@ark-ui/vue/collection'
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon, LoaderIcon } from 'lucide-vue-next'
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
  const currentSort = list.value.sortDescriptor
  let direction: 'ascending' | 'descending' = 'ascending'
  if (currentSort?.column === column && currentSort.direction === 'ascending') {
    direction = 'descending'
  }
  list.value.sort({ column, direction })
}
</script>

<template>
  <div :class="styles.Root">
    <div :class="styles.Header">
      <button :class="button.Root" @click="handleSort('title')">
        Sort by title
        <template v-if="list.sortDescriptor?.column === 'title'">
          <ArrowUpIcon v-if="list.sortDescriptor?.direction === 'ascending'" />
          <ArrowDownIcon v-else />
        </template>
        <ArrowUpDownIcon v-else />
      </button>
      <span v-if="list.loading" :class="styles.Loading">
        <LoaderIcon :class="styles.Spinner" />
        Loading
      </span>
    </div>

    <div v-if="list.error" :class="styles.Error">Error: {{ list.error.message }}</div>

    <div :class="styles.ItemGroup">
      <div v-for="product in list.items" :key="product.id" :class="styles.Item" data-variant="outline">
        <div :class="styles.ItemMedia">
          <img :src="product.image" :alt="product.title" />
        </div>
        <div :class="styles.ItemContent">
          <div :class="styles.ItemTitle">{{ product.title }}</div>
          <div :class="styles.ItemDescription">${{ product.price }}</div>
          <div :class="styles.ItemMeta">
            {{ product.category }} • {{ product.rating.rate }} ({{ product.rating.count }} reviews)
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
