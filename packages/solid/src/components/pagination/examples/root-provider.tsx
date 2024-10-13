import { Pagination, usePagination } from '@ark-ui/solid/pagination'
import { For } from 'solid-js'

export const RootProvider = () => {
  const pagination = usePagination({ count: 5000, pageSize: 10, siblingCount: 2 })

  return (
    <>
      <button onClick={() => pagination().goToNextPage()}>Next Page</button>

      <Pagination.RootProvider value={pagination}>
        <Pagination.PrevTrigger>Previous Page</Pagination.PrevTrigger>
        <Pagination.Context>
          {(api) => (
            <For each={api().pages}>
              {(page, index) =>
                page.type === 'page' ? (
                  <Pagination.Item {...page}>{page.value}</Pagination.Item>
                ) : (
                  <Pagination.Ellipsis index={index()}>&#8230;</Pagination.Ellipsis>
                )
              }
            </For>
          )}
        </Pagination.Context>
        <Pagination.NextTrigger>Next Page</Pagination.NextTrigger>
      </Pagination.RootProvider>
    </>
  )
}
