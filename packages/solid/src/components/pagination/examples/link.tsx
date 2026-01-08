import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-solid'
import { Pagination, usePagination } from '@ark-ui/solid/pagination'
import { For } from 'solid-js'
import styles from 'styles/pagination.module.css'

export const Link = () => {
  const pagination = usePagination({
    type: 'link',
    count: 100,
    pageSize: 10,
    siblingCount: 2,
    getPageUrl: ({ page }) => `/page=${page}`,
  })

  return (
    <Pagination.RootProvider value={pagination} class={styles.Root}>
      <div class={styles.Controls}>
        <a class={styles.Trigger} {...pagination().getPrevTriggerProps()}>
          <ChevronLeftIcon />
        </a>
        <For each={pagination().pages}>
          {(page, index) =>
            page.type === 'page' ? (
              <a class={styles.Item} {...pagination().getItemProps(page)}>
                {page.value}
              </a>
            ) : (
              <span class={styles.Ellipsis} {...pagination().getEllipsisProps({ index: index() })}>
                &#8230;
              </span>
            )
          }
        </For>
        <a class={styles.Trigger} {...pagination().getNextTriggerProps()}>
          <ChevronRightIcon />
        </a>
      </div>
    </Pagination.RootProvider>
  )
}
