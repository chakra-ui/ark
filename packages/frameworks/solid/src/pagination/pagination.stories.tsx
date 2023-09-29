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
      <Pagination.List>
        <Pagination.ListItem>
          <Pagination.PrevPageTrigger>
            Previous <span class="visually-hidden">Page</span>
          </Pagination.PrevPageTrigger>
        </Pagination.ListItem>

        <For each={api().pages}>
          {(page, index) =>
            page.type === 'page' ? (
              <Pagination.ListItem>
                <Pagination.PageTrigger value={page.value}>{page.value}</Pagination.PageTrigger>
              </Pagination.ListItem>
            ) : (
              <Pagination.ListItem>
                <Pagination.Ellipsis index={index()}>&#8230;</Pagination.Ellipsis>
              </Pagination.ListItem>
            )
          }
        </For>
        <Pagination.ListItem>
          <Pagination.NextPageTrigger>
            Next <span class="visually-hidden">Page</span>
          </Pagination.NextPageTrigger>
        </Pagination.ListItem>
      </Pagination.List>
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
        nextPageTriggerLabel: 'Next',
        prevPageTriggerLabel: 'Prev',
        pageTriggerLabel: (details) => `Page ${details.page}`,
      }}
    >
      {/* ... */}
    </Pagination.Root>
  )
}
