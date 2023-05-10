import { For, createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNextPageTrigger,
  PaginationPageTrigger,
  PaginationPrevPageTrigger,
} from './'
import './pagination.css'

const meta: Meta = {
  title: 'Pagination',
}

export default meta

export const Basic = () => (
  <Pagination count={5000} pageSize={10} siblingCount={2}>
    {(api) => (
      <PaginationList>
        <PaginationListItem>
          <PaginationPrevPageTrigger>
            Previous <span class="visually-hidden">Page</span>
          </PaginationPrevPageTrigger>
        </PaginationListItem>

        <For each={api().pages}>
          {(page, index) =>
            page.type === 'page' ? (
              <PaginationListItem>
                <PaginationPageTrigger value={page.value}>{page.value}</PaginationPageTrigger>
              </PaginationListItem>
            ) : (
              <PaginationListItem>
                <PaginationEllipsis index={index()}>&#8230;</PaginationEllipsis>
              </PaginationListItem>
            )
          }
        </For>
        <PaginationListItem>
          <PaginationNextPageTrigger>
            Next <span class="visually-hidden">Page</span>
          </PaginationNextPageTrigger>
        </PaginationListItem>
      </PaginationList>
    )}
  </Pagination>
)

export const Controlled = () => {
  const [currentPage, setCurrentPage] = createSignal(1)

  return (
    <Pagination
      count={5000}
      pageSize={10}
      siblingCount={2}
      page={currentPage()}
      onChange={(details) => setCurrentPage(details.page)}
    >
      {/* ... */}
    </Pagination>
  )
}

export const Customized = () => {
  return (
    <Pagination
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
    </Pagination>
  )
}
