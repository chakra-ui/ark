<script setup lang="ts">
import { useAsyncList } from '@ark-ui/vue/collection'
import { LoaderIcon } from 'lucide-vue-next'
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

<template>
  <div :class="styles.Root">
    <div :class="styles.Header">
      <button :class="button.Root" @click="list.reload()" :disabled="list.loading">
        <template v-if="list.loading">
          <LoaderIcon :class="styles.Spinner" />
          Loading
        </template>
        <template v-else>Reload Quotes</template>
      </button>
    </div>

    <div v-if="list.error" :class="styles.Error">Error: {{ list.error.message }}</div>

    <div :class="styles.ItemGroup">
      <div v-for="quote in list.items" :key="quote.id" :class="styles.Item">
        <div :class="styles.ItemContent">
          <div :class="styles.ItemDescription">"{{ quote.quote }}"</div>
          <div :class="styles.ItemMeta">— {{ quote.author }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
