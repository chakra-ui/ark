import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Pagination } from '@ark-ui/react/pagination'
import styles from 'styles/pagination.module.css'

export const PageSizeControl = () => {
  return (
    <Pagination.Root count={100} defaultPageSize={10} className={styles.Root}>
      <Pagination.Context>
        {(pagination) => (
          <>
            <div className="hstack">
              <label className={styles.Text}>Items per page:</label>
              <select
                className={styles.PageSizeSelect}
                value={pagination.pageSize}
                onChange={(e) => pagination.setPageSize(Number(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

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

            <p className={styles.Text}>
              Page {pagination.page} of {pagination.totalPages}
            </p>
          </>
        )}
      </Pagination.Context>
    </Pagination.Root>
  )
}
