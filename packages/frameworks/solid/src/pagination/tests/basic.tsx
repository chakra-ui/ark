import { For } from 'solid-js'
import { Pagination, type PaginationRootProps } from '../'

export const ComponentUnderTest = (props: PaginationRootProps) => (
  <Pagination.Root {...props}>
    <Pagination.PrevTrigger>
      Previous <span class="visually-hidden">Page</span>
    </Pagination.PrevTrigger>
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
    <Pagination.NextTrigger>
      Next <span class="visually-hidden">Page</span>
    </Pagination.NextTrigger>
  </Pagination.Root>
)
