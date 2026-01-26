import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useState } from 'react'
import { Pagination } from '@ark-ui/react/pagination'
import styles from 'styles/pagination.module.css'

export const Controlled = () => {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <Pagination.Root
      count={5000}
      pageSize={10}
      siblingCount={2}
      page={currentPage}
      onPageChange={(details) => setCurrentPage(details.page)}
      className={styles.Root}
    >
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
    </Pagination.Root>
  )
}
