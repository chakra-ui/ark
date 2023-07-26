import type { Meta } from '@storybook/react'
import { useState } from 'react'
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

type PaginationType = typeof Pagination

const meta: Meta<PaginationType> = {
  title: 'Pagination',
  component: Pagination,
}

export default meta

export const Basic = () => (
  <Pagination defaultPage={2} count={5000} pageSize={10} siblingCount={2}>
    {({ pages }) => (
      <PaginationList>
        <PaginationListItem>
          <PaginationPrevPageTrigger>Previous Page</PaginationPrevPageTrigger>
        </PaginationListItem>
        {pages.map((page, index) =>
          page.type === 'page' ? (
            <PaginationListItem key={index}>
              <PaginationPageTrigger {...page}>{page.value}</PaginationPageTrigger>
            </PaginationListItem>
          ) : (
            <PaginationListItem key={index}>
              <PaginationEllipsis index={index}>&#8230;</PaginationEllipsis>
            </PaginationListItem>
          ),
        )}
        <PaginationListItem>
          <PaginationNextPageTrigger>Next Page</PaginationNextPageTrigger>
        </PaginationListItem>
      </PaginationList>
    )}
  </Pagination>
)

export const Controlled = () => {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <Pagination
      count={5000}
      pageSize={10}
      siblingCount={2}
      page={currentPage}
      onChange={(details) => setCurrentPage(details.page)}
    >
      {/* ... */}
    </Pagination>
  )
}

export const Customized = () => (
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
