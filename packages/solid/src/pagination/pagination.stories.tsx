import { For } from 'solid-js'
import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
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
        <PaginationPrevPageTrigger asChild>
          <button>
            Previous <span class="visually-hidden">Page</span>
          </button>
        </PaginationPrevPageTrigger>
        <For each={api().pages}>
          {(page, index) =>
            page.type === 'page' ? (
              <PaginationPageTrigger asChild value={page.value}>
                <button>{page.value}</button>
              </PaginationPageTrigger>
            ) : (
              <PaginationEllipsis index={index()}>&#8230;</PaginationEllipsis>
            )
          }
        </For>
        <PaginationNextPageTrigger asChild>
          <button>
            Next <span class="visually-hidden">Page</span>
          </button>
        </PaginationNextPageTrigger>
      </PaginationList>
    )}
  </Pagination>
)
