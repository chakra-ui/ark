import type { Meta } from '@storybook/react'
import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationNextPageTrigger,
  PaginationPageTrigger,
  PaginationPrevPageTrigger,
} from './'
import './pagination.css'

type PaginationType = typeof Pagination

const meta: Meta<PaginationType> = {
  title: 'Pagination',
  component: Pagination,
}

export default meta

export const Basic = () => (
  <Pagination count={5000} pageSize={10} siblingCount={2}>
    {({ pages }) => (
      <PaginationList>
        <PaginationPrevPageTrigger>
          <button>
            Previous <span className="visually-hidden">Page</span>
          </button>
        </PaginationPrevPageTrigger>
        {pages.map((page, index) =>
          page.type === 'page' ? (
            <PaginationPageTrigger key={index} value={page.value}>
              <button>{page.value}</button>
            </PaginationPageTrigger>
          ) : (
            <PaginationEllipsis key={index} index={index}>
              &#8230;
            </PaginationEllipsis>
          ),
        )}
        <PaginationNextPageTrigger>
          <button>
            Next <span className="visually-hidden">Page</span>
          </button>
        </PaginationNextPageTrigger>
      </PaginationList>
    )}
  </Pagination>
)
