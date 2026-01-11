import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Pagination } from '@ark-ui/react/pagination'
import styles from 'styles/pagination.module.css'

export const PageRange = () => {
  return (
    <Pagination.Root count={100} pageSize={10} className={styles.Root}>
      <Pagination.Context>
        {(pagination) => (
          <>
            <div className={styles.Controls}>
              <Pagination.PrevTrigger className={styles.Trigger}>
                <ChevronLeftIcon />
              </Pagination.PrevTrigger>

              {pagination.pages.map((page, index) =>
                page.type === 'page' ? (
                  <Pagination.Item key={index} {...page} className={styles.Item}>
                    {page.value}
                  </Pagination.Item>
                ) : (
                  <Pagination.Ellipsis key={index} index={index} className={styles.Ellipsis}>
                    &#8230;
                  </Pagination.Ellipsis>
                ),
              )}

              <Pagination.NextTrigger className={styles.Trigger}>
                <ChevronRightIcon />
              </Pagination.NextTrigger>
            </div>

            <div className="stack">
              <p className={styles.Text}>
                Showing {pagination.pageRange.start + 1}-{pagination.pageRange.end} of {pagination.count} results
              </p>
              <p className={styles.Text}>
                Page {pagination.page} of {pagination.totalPages}
              </p>
            </div>
          </>
        )}
      </Pagination.Context>
    </Pagination.Root>
  )
}
