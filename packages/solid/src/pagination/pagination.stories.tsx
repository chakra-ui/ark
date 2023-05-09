import { For, createSignal } from 'solid-js'
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
import type { Meta } from 'storybook-solidjs'

const meta: Meta = {
  title: 'Pagination',
}

export default meta

export const Basic = () => (
  <Pagination count={5000} pageSize={10} siblingCount={2}>
    {(api) => (
      <PaginationList>
        <PaginationListItem>
          <PaginationPrevPageTrigger asChild>
            <button>
              Previous <span class="visually-hidden">Page</span>
            </button>
          </PaginationPrevPageTrigger>
        </PaginationListItem>

        <For each={api().pages}>
          {(page, index) =>
            page.type === 'page' ? (
              <PaginationListItem>
                <PaginationPageTrigger asChild value={page.value}>
                  <button>{page.value}</button>
                </PaginationPageTrigger>
              </PaginationListItem>
            ) : (
              <PaginationListItem>
                <PaginationEllipsis index={index()}>&#8230;</PaginationEllipsis>
              </PaginationListItem>
            )
          }
        </For>
        <PaginationListItem>
          <PaginationNextPageTrigger asChild>
            <button>
              Next <span class="visually-hidden">Page</span>
            </button>
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
