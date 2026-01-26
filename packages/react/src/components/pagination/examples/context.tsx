import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react'
import { Pagination } from '@ark-ui/react/pagination'
import styles from 'styles/pagination.module.css'

export const Context = () => {
  return (
    <Pagination.Root count={100} pageSize={10} className={styles.Root}>
      <Pagination.Context>
        {(pagination) => (
          <div className={styles.Controls}>
            <button className={styles.Trigger} onClick={() => pagination.goToFirstPage()}>
              <ChevronsLeftIcon />
            </button>
            <button className={styles.Trigger} onClick={() => pagination.goToPrevPage()}>
              <ChevronLeftIcon />
            </button>
            <p className={styles.Text} style={{ minWidth: '120px', textAlign: 'center' }}>
              Page {pagination.page} of {pagination.totalPages}
            </p>
            <button className={styles.Trigger} onClick={() => pagination.goToNextPage()}>
              <ChevronRightIcon />
            </button>
            <button className={styles.Trigger} onClick={() => pagination.goToLastPage()}>
              <ChevronsRightIcon />
            </button>
          </div>
        )}
      </Pagination.Context>
    </Pagination.Root>
  )
}
