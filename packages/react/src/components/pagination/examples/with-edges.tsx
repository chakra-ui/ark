import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react'
import { Pagination } from '@ark-ui/react/pagination'
import styles from 'styles/pagination.module.css'

export const WithEdges = () => (
  <Pagination.Root count={5000} pageSize={20} siblingCount={2} className={styles.Root}>
    <div className={styles.Controls}>
      <Pagination.FirstTrigger className={styles.Trigger}>
        <ChevronsLeftIcon />
      </Pagination.FirstTrigger>

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

      <Pagination.LastTrigger className={styles.Trigger}>
        <ChevronsRightIcon />
      </Pagination.LastTrigger>
    </div>
  </Pagination.Root>
)
