<script lang="ts">
  import { useAsyncList } from '@ark-ui/svelte/collection'
  import { LoaderIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/async-list.module.css'

  const LIMIT = 4

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

<div class={styles.Root}>
  <div class={styles.Header}>
    <span class={styles.Status}>
      Loaded {list().items.length} posts
      {#if list().cursor}(more available){/if}
    </span>
    {#if list().cursor}
      <button class={button.Root} onclick={() => list().loadMore()} disabled={list().loading}>
        {#if list().loading}
          <LoaderIcon class={styles.Spinner} /> Loading
        {:else}
          Load More
        {/if}
      </button>
    {/if}
  </div>

  {#if list().error}
    <div class={styles.Error}>Error: {list().error.message}</div>
  {/if}

  <div class={styles.ItemGroup}>
    {#each list().items as post, index}
      <div class={styles.Item}>
        <div class={styles.ItemContent}>
          <div class={styles.ItemTitle}>{index + 1}. {post.title}</div>
          <div class={styles.ItemDescription}>{post.body}</div>
        </div>
      </div>
    {/each}
  </div>
</div>
