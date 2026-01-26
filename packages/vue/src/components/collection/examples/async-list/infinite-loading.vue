<script setup lang="ts">
import { useAsyncList } from '@ark-ui/vue/collection'
import { LoaderIcon } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/async-list.module.css'

const LIMIT = 5

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

const list = useAsyncList<Post, number>({
  autoReload: true,
  async load({ cursor }) {
    const page = cursor || 1
    const start = (page - 1) * LIMIT

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${LIMIT}`)

    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }

    const posts: Post[] = await response.json()
    const hasNextPage = posts.length === LIMIT

    return {
      items: posts,
      cursor: hasNextPage ? page + 1 : undefined,
    }
  },
})
</script>

<template>
  <div :class="styles.Root">
    <div :class="styles.Header">
      <button v-if="list.cursor" :class="button.Root" @click="list.loadMore()" :disabled="list.loading">
        <template v-if="list.loading">
          <LoaderIcon :class="styles.Spinner" />
          Loading
        </template>
        <template v-else>Load More</template>
      </button>
    </div>

    <div :class="styles.Status">
      Loaded {{ list.items.length }} posts
      <span v-if="list.cursor">(more available)</span>
    </div>

    <div v-if="list.error" :class="styles.Error">Error: {{ list.error.message }}</div>

    <div :class="styles.ItemGroup">
      <div v-for="(post, index) in list.items" :key="post.id" :class="styles.Item">
        <div :class="styles.ItemContent">
          <div :class="styles.ItemTitle">{{ index + 1 }}. {{ post.title }}</div>
          <div :class="styles.ItemDescription">{{ post.body }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
