import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Pagination, usePagination } from '@ark-ui/react/pagination'
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
    <Pagination.RootProvider value={pagination} className={styles.Root}>
      <div className={styles.Controls}>
        <a className={styles.Trigger} {...pagination.getPrevTriggerProps()}>
          <ChevronLeftIcon />
        </a>
        {pagination.pages.map((page, index) =>
          page.type === 'page' ? (
            <a key={index} className={styles.Item} {...pagination.getItemProps(page)}>
              {page.value}
            </a>
          ) : (
            <span key={index} className={styles.Ellipsis} {...pagination.getEllipsisProps({ index })}>
              &#8230;
            </span>
          ),
        )}
        <a className={styles.Trigger} {...pagination.getNextTriggerProps()}>
          <ChevronRightIcon />
        </a>
      </div>
    </Pagination.RootProvider>
  )
}
