<script lang="ts">
  import { useAsyncList } from '@ark-ui/svelte/collection'

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
      const limit = 10
      const start = (page - 1) * limit

      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`)

      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }

      const posts: Post[] = await response.json()
      const hasNextPage = posts.length === limit

      return {
        items: posts,
        cursor: hasNextPage ? page + 1 : undefined,
      }
    },
  })
</script>

<div>
  <div>
    Loaded {list().items.length} posts
    {#if list().cursor}(more available){/if}
  </div>

  {#if list().cursor}
    <button onclick={() => list().loadMore()} disabled={list().loading}>
      {list().loading ? 'Loading...' : 'Load More'}
    </button>
  {/if}

  {#if list().error}
    <div>Error: {list().error.message}</div>
  {/if}

  <div>
    {#each list().items as post, index}
      <div>
        <div>
          <strong>{index + 1}:</strong>
          <strong>{post.title}</strong>
        </div>
        <div>{post.body}</div>
      </div>
    {/each}
  </div>
</div>
