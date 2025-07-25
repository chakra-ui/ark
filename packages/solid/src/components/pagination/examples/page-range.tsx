import { Pagination } from '@ark-ui/solid/pagination'
import { For } from 'solid-js'

export const PageRange = () => {
  return (
    <Pagination.Root count={100} pageSize={10}>
      <Pagination.Context>
        {(api) => (
          <div>
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

            <div>
              <p>
                Showing {api().pageRange.start + 1}-{api().pageRange.end} of {api().count} results
              </p>
              <p>
                Page {api().page} of {api().totalPages}
              </p>
            </div>
          </div>
        )}
      </Pagination.Context>
    </Pagination.Root>
  )
}
