import { For } from 'solid-js'
import { Pagination } from '../..'

export const Customized = () => {
  return (
    <Pagination.Root
      count={5000}
      pageSize={20}
      siblingCount={3}
      translations={{
        nextTriggerLabel: 'Next',
        prevTriggerLabel: 'Prev',
        itemLabel: (details) => `Page ${details.page}`,
      }}
    >
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
}
