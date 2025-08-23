<script setup lang="ts">
import { useAsyncList } from '@ark-ui/vue/collection'

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

<template>
  <div>
    <div>
      <button @click="list.reload()" :disabled="list.loading">
        {{ list.loading ? 'Loading...' : 'Reload Quotes' }}
      </button>
    </div>

    <div v-if="list.error">Error: {{ list.error.message }}</div>

    <div>
      <div v-for="quote in list.items" :key="quote.id">
        <div>"{{ quote.quote }}"</div>
        <div>— {{ quote.author }}</div>
      </div>
    </div>
  </div>
</template>
