import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Pagination } from '@ark-ui/react/pagination'
import styles from 'styles/pagination.module.css'

const users = [
  { id: 1, name: 'Emma Wilson', email: 'emma@example.com' },
  { id: 2, name: 'Liam Johnson', email: 'liam@example.com' },
  { id: 3, name: 'Olivia Brown', email: 'olivia@example.com' },
  { id: 4, name: 'Noah Davis', email: 'noah@example.com' },
  { id: 5, name: 'Ava Martinez', email: 'ava@example.com' },
  { id: 6, name: 'Ethan Garcia', email: 'ethan@example.com' },
  { id: 7, name: 'Sophia Rodriguez', email: 'sophia@example.com' },
  { id: 8, name: 'Mason Lee', email: 'mason@example.com' },
  { id: 9, name: 'Isabella Walker', email: 'isabella@example.com' },
  { id: 10, name: 'James Hall', email: 'james@example.com' },
  { id: 11, name: 'Mia Allen', email: 'mia@example.com' },
  { id: 12, name: 'Benjamin Young', email: 'benjamin@example.com' },
  { id: 13, name: 'Charlotte King', email: 'charlotte@example.com' },
  { id: 14, name: 'William Wright', email: 'william@example.com' },
  { id: 15, name: 'Amelia Scott', email: 'amelia@example.com' },
  { id: 16, name: 'Henry Green', email: 'henry@example.com' },
  { id: 17, name: 'Harper Adams', email: 'harper@example.com' },
  { id: 18, name: 'Sebastian Baker', email: 'sebastian@example.com' },
  { id: 19, name: 'Evelyn Nelson', email: 'evelyn@example.com' },
  { id: 20, name: 'Jack Carter', email: 'jack@example.com' },
]

export const DataSlicing = () => {
  return (
    <Pagination.Root count={users.length} pageSize={5} className={styles.Root}>
      <Pagination.Context>
        {(pagination) => (
          <>
            <div className={styles.Grid}>
              {pagination.slice(users).map((user) => (
                <div key={user.id} className={styles.GridItem}>
                  <span className={styles.GridItemTitle}>{user.name}</span>
                  <span className={styles.GridItemText}>{user.email}</span>
                </div>
              ))}
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
          </>
        )}
      </Pagination.Context>
    </Pagination.Root>
  )
}
