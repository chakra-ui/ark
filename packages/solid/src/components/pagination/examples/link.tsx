import { Pagination, usePagination } from '@ark-ui/solid/pagination'
import { For } from 'solid-js'

export const Link = () => {
  const pagination = usePagination({
    type: 'link',
    count: 100,
    pageSize: 10,
    siblingCount: 2,
    getPageUrl: ({ page }) => `/page=${page}`,
  })

  return (
    <Pagination.RootProvider value={pagination}>
      <a {...pagination().getPrevTriggerProps()}>Previous</a>
      <For each={pagination().pages}>
        {(page, index) =>
          page.type === 'page' ? (
            <a {...pagination().getItemProps(page)}>{page.value}</a>
          ) : (
            <span {...pagination().getEllipsisProps({ index: index() })}>&#8230;</span>
          )
        }
      </For>
      <a {...pagination().getNextTriggerProps()}>Next</a>
    </Pagination.RootProvider>
  )
}
