import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-solid'
import { Pagination } from '@ark-ui/solid/pagination'
import styles from 'styles/pagination.module.css'

export const Context = () => {
  return (
    <Pagination.Root count={100} pageSize={10} class={styles.Root}>
      <Pagination.Context>
        {(pagination) => (
          <div class={styles.Controls}>
            <button class={styles.Trigger} onClick={() => pagination().goToFirstPage()}>
              <ChevronsLeftIcon />
            </button>
            <button class={styles.Trigger} onClick={() => pagination().goToPrevPage()}>
              <ChevronLeftIcon />
            </button>
            <p class={styles.Text} style={{ 'min-width': '120px', 'text-align': 'center' }}>
              Page {pagination().page} of {pagination().totalPages}
            </p>
            <button class={styles.Trigger} onClick={() => pagination().goToNextPage()}>
              <ChevronRightIcon />
            </button>
            <button class={styles.Trigger} onClick={() => pagination().goToLastPage()}>
              <ChevronsRightIcon />
            </button>
          </div>
        )}
      </Pagination.Context>
    </Pagination.Root>
  )
}
