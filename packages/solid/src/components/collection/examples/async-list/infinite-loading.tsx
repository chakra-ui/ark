import { useAsyncList } from '@ark-ui/solid/collection'
import { LoaderIcon } from 'lucide-solid'
import { For } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/async-list.module.css'

const LIMIT = 4

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export const InfiniteLoading = () => {
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

  return (
    <div class={styles.Root}>
      <div class={styles.Header}>
        <span class={styles.Status}>
          Loaded {list().items.length} posts
          {list().cursor && ` (more available)`}
        </span>
        {list().cursor && (
          <button class={button.Root} onClick={() => list().loadMore()} disabled={list().loading}>
            {list().loading ? (
              <>
                <LoaderIcon class={styles.Spinner} /> Loading
              </>
            ) : (
              'Load More'
            )}
          </button>
        )}
      </div>

      {list().error && <div class={styles.Error}>Error: {list().error.message}</div>}

      <div class={styles.ItemGroup}>
        <For each={list().items}>
          {(post, index) => (
            <div class={styles.Item}>
              <div class={styles.ItemContent}>
                <div class={styles.ItemTitle}>
                  {index() + 1}. {post.title}
                </div>
                <div class={styles.ItemDescription}>{post.body}</div>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  )
}
