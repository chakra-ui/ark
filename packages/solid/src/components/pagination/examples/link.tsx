import { Pagination, usePagination } from '@ark-ui/solid/pagination'
import { For } from 'solid-js'

export const Link = () => {
  const pagination = usePagination({
    type: 'link',
    count: 100,
    pageSize: 10,
    siblingCount: 2,
  })

  const getHref = (page: number | null) => (page != null ? `/page=${page}` : '/')

  return (
    <Pagination.RootProvider value={pagination}>
      <a {...pagination().getPrevTriggerProps()} href={getHref(pagination().previousPage)}>
        Previous
      </a>
      <For each={pagination().pages}>
        {(page, index) =>
          page.type === 'page' ? (
            <a {...pagination().getItemProps(page)} href={getHref(page.value)}>
              {page.value}
            </a>
          ) : (
            <span {...pagination().getEllipsisProps({ index: index() })}>&#8230;</span>
          )
        }
      </For>
      <a {...pagination().getNextTriggerProps()} href={getHref(pagination().nextPage)}>
        Next
      </a>
    </Pagination.RootProvider>
  )
}
