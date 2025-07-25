import { Pagination } from '@ark-ui/solid/pagination'
import { For } from 'solid-js'

const items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`)

export const DataSlicing = () => {
  return (
    <Pagination.Root count={items.length} pageSize={10}>
      <Pagination.Context>
        {(api) => (
          <div>
            <div>
              <h3>Current Page Items:</h3>
              <ul>
                <For each={api().slice(items)}>{(item) => <li>{item}</li>}</For>
              </ul>
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
          </div>
        )}
      </Pagination.Context>
    </Pagination.Root>
  )
}
