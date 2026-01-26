import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-solid'
import { Pagination } from '@ark-ui/solid/pagination'
import { For } from 'solid-js'
import styles from 'styles/pagination.module.css'

export const PageRange = () => {
  return (
    <Pagination.Root count={100} pageSize={10} class={styles.Root}>
      <Pagination.Context>
        {(pagination) => (
          <>
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

            <div class="stack">
              <p class={styles.Text}>
                Showing {pagination().pageRange.start + 1}-{pagination().pageRange.end} of {pagination().count} results
              </p>
              <p class={styles.Text}>
                Page {pagination().page} of {pagination().totalPages}
              </p>
            </div>
          </>
        )}
      </Pagination.Context>
    </Pagination.Root>
  )
}
