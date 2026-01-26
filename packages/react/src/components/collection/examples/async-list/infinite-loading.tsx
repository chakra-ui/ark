import { useAsyncList } from '@ark-ui/react/collection'
import { LoaderIcon } from 'lucide-react'
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
    <div className={styles.Root}>
      <div className={styles.Header}>
        <span className={styles.Status}>
          Loaded {list.items.length} posts
          {list.cursor && ` (more available)`}
        </span>
        {list.cursor && (
          <button className={button.Root} onClick={() => list.loadMore()} disabled={list.loading}>
            {list.loading ? (
              <>
                <LoaderIcon className={styles.Spinner} /> Loading
              </>
            ) : (
              'Load More'
            )}
          </button>
        )}
      </div>

      {list.error && <div className={styles.Error}>Error: {list.error.message}</div>}

      <div className={styles.ItemGroup}>
        {list.items.map((post, index) => (
          <div key={post.id} className={styles.Item}>
            <div className={styles.ItemContent}>
              <div className={styles.ItemTitle}>
                {index + 1}. {post.title}
              </div>
              <div className={styles.ItemDescription}>{post.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
