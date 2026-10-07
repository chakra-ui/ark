import { Pagination } from '@ark-ui/solid/pagination'
import { For } from 'solid-js'

export const ComponentUnderTest = (props: Pagination.RootProps) => (
  <Pagination.Root type="link" getPageUrl={({ page }) => `/page/${page}`} {...props}>
    <Pagination.FirstTrigger>First</Pagination.FirstTrigger>
    <Pagination.PrevTrigger>Prev</Pagination.PrevTrigger>
    <Pagination.Context>
      {(pagination) => (
        <For each={pagination().pages}>
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
    <Pagination.NextTrigger target="_blank" rel="noreferrer">
      Next
    </Pagination.NextTrigger>
    <Pagination.LastTrigger>Last</Pagination.LastTrigger>
  </Pagination.Root>
)
