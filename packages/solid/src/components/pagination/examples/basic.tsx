import { For } from 'solid-js'
import { Pagination } from '../..'

export const Basic = () => (
  <Pagination.Root count={5000} pageSize={10} siblingCount={2}>
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
  </Pagination.Root>
)
