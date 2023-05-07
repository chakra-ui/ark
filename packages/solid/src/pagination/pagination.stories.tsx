import type { Meta } from 'storybook-solidjs'
import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
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
        <PaginationPrevPageTrigger asChild>
          <button>
            Previous <span class="visually-hidden">Page</span>
          </button>
        </PaginationPrevPageTrigger>

        {api().pages.map((page, index) =>
          page.type === 'page' ? (
            <PaginationPageTrigger value={page.value} asChild>
              <button>{page.value}</button>
            </PaginationPageTrigger>
          ) : (
            <PaginationEllipsis index={index}>&#8230;</PaginationEllipsis>
          ),
        )}

        <PaginationNextPageTrigger asChild>
          <button>
            Next <span class="visually-hidden">Page</span>
          </button>
        </PaginationNextPageTrigger>
      </PaginationList>
    )}
  </Pagination>
)
