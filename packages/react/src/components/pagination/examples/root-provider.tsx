import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Pagination, usePagination } from '@ark-ui/react/pagination'
import styles from 'styles/pagination.module.css'

export const RootProvider = () => {
  const pagination = usePagination({ count: 5000, pageSize: 10, siblingCount: 2 })

  return (
    <div className="stack">
      <button className={styles.Trigger} onClick={() => pagination.goToNextPage()}>
        Next Page
      </button>

      <Pagination.RootProvider value={pagination} className={styles.Root}>
        <div className={styles.Controls}>
          <Pagination.PrevTrigger className={styles.Trigger}>
            <ChevronLeftIcon />
          </Pagination.PrevTrigger>
          <Pagination.Context>
            {(pagination) =>
              pagination.pages.map((page, index) =>
                page.type === 'page' ? (
                  <Pagination.Item key={index} {...page} className={styles.Item}>
                    {page.value}
                  </Pagination.Item>
                ) : (
                  <Pagination.Ellipsis key={index} index={index} className={styles.Ellipsis}>
                    &#8230;
                  </Pagination.Ellipsis>
                ),
              )
            }
          </Pagination.Context>
          <Pagination.NextTrigger className={styles.Trigger}>
            <ChevronRightIcon />
          </Pagination.NextTrigger>
        </div>
      </Pagination.RootProvider>
    </div>
  )
}
