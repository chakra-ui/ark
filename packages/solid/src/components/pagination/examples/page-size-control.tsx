import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-solid'
import { Pagination } from '@ark-ui/solid/pagination'
import { For } from 'solid-js'
import styles from 'styles/pagination.module.css'

export const PageSizeControl = () => {
  return (
    <Pagination.Root count={100} defaultPageSize={10} class={styles.Root}>
      <Pagination.Context>
        {(pagination) => (
          <>
            <div class="hstack">
              <label class={styles.Text}>Items per page:</label>
              <select
                class={styles.PageSizeSelect}
                value={pagination().pageSize}
                onChange={(e) => pagination().setPageSize(Number(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div class={styles.Controls}>
              <Pagination.PrevTrigger class={styles.Trigger}>
                <ChevronLeftIcon />
              </Pagination.PrevTrigger>

              <For each={pagination().pages}>
                {(page, index) =>
                  page.type === 'page' ? (
                    <Pagination.Item {...page} class={styles.Item}>
                      {page.value}
                    </Pagination.Item>
                  ) : (
                    <Pagination.Ellipsis index={index()} class={styles.Ellipsis}>
                      &#8230;
                    </Pagination.Ellipsis>
                  )
                }
              </For>

              <Pagination.NextTrigger class={styles.Trigger}>
                <ChevronRightIcon />
              </Pagination.NextTrigger>
            </div>

            <p class={styles.Text}>
              Page {pagination().page} of {pagination().totalPages}
            </p>
          </>
        )}
      </Pagination.Context>
    </Pagination.Root>
  )
}
