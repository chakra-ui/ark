import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-solid'
import { Pagination } from '@ark-ui/solid/pagination'
import { For } from 'solid-js'
import styles from 'styles/pagination.module.css'

export const WithEdges = () => (
  <Pagination.Root count={5000} pageSize={20} siblingCount={2} class={styles.Root}>
    <div class={styles.Controls}>
      <Pagination.FirstTrigger class={styles.Trigger}>
        <ChevronsLeftIcon />
      </Pagination.FirstTrigger>

      <Pagination.PrevTrigger class={styles.Trigger}>
        <ChevronLeftIcon />
      </Pagination.PrevTrigger>

      <Pagination.Context>
        {(pagination) => (
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
        )}
      </Pagination.Context>

      <Pagination.NextTrigger class={styles.Trigger}>
        <ChevronRightIcon />
      </Pagination.NextTrigger>

      <Pagination.LastTrigger class={styles.Trigger}>
        <ChevronsRightIcon />
      </Pagination.LastTrigger>
    </div>
  </Pagination.Root>
)
