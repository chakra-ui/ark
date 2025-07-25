import { Pagination } from '@ark-ui/solid/pagination'
import { For } from 'solid-js'

export const PageSizeControl = () => {
  return (
    <Pagination.Root count={100} pageSize={10}>
      <Pagination.Context>
        {(api) => (
          <div>
            <div>
              <label>Items per page: </label>
              <select value={api().pageSize} onChange={(e) => api().setPageSize(Number(e.target.value))}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div>
              <Pagination.PrevTrigger>Previous</Pagination.PrevTrigger>

              <For each={api().pages}>
                {(page, index) =>
                  page.type === 'page' ? (
                    <Pagination.Item {...page}>{page.value}</Pagination.Item>
                  ) : (
                    <Pagination.Ellipsis index={index()}>&#8230;</Pagination.Ellipsis>
                  )
                }
              </For>

              <Pagination.NextTrigger>Next</Pagination.NextTrigger>
            </div>

            <p>
              Page {api().page} of {api().totalPages}
            </p>
          </div>
        )}
      </Pagination.Context>
    </Pagination.Root>
  )
}
