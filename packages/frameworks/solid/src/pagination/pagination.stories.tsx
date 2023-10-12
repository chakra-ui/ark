import { For, createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { Pagination } from './'
import './pagination.css'

const meta: Meta = {
  title: 'Pagination',
}

export default meta

export const Basic = () => (
  <Pagination.Root count={5000} pageSize={10} siblingCount={2}>
    {(api) => (
      <>
        <Pagination.PrevTrigger>
          Previous <span class="visually-hidden">Page</span>
        </Pagination.PrevTrigger>

        <For each={api().pages}>
          {(page, index) =>
            page.type === 'page' ? (
              <Pagination.Item value={page.value}>{page.value}</Pagination.Item>
            ) : (
              <Pagination.Ellipsis index={index()}>&#8230;</Pagination.Ellipsis>
            )
          }
        </For>
        <Pagination.NextTrigger>
          Next <span class="visually-hidden">Page</span>
        </Pagination.NextTrigger>
      </>
    )}
  </Pagination.Root>
)

export const Controlled = () => {
  const [currentPage, setCurrentPage] = createSignal(1)

  return (
    <Pagination.Root
      count={5000}
      pageSize={10}
      siblingCount={2}
      page={currentPage()}
      onPageChange={(details) => setCurrentPage(details.page)}
    >
      {/* ... */}
    </Pagination.Root>
  )
}

export const Customized = () => {
  return (
    <Pagination.Root
      count={5000}
      pageSize={20}
      siblingCount={3}
      dir="ltr"
      translations={{
        nextTriggerLabel: 'Next',
        prevTriggerLabel: 'Prev',
        itemLabel: (details) => `Page ${details.page}`,
      }}
    >
      {/* ... */}
    </Pagination.Root>
  )
}
