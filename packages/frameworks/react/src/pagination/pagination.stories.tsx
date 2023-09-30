import type { Meta } from '@storybook/react'
import { useState } from 'react'
import { Pagination } from './'
import './pagination.css'

type PaginationType = typeof Pagination

const meta: Meta<PaginationType> = {
  title: 'Pagination',
  component: Pagination,
}

export default meta

export const Basic = () => (
  <Pagination.Root defaultPage={2} count={5000} pageSize={10} siblingCount={2}>
    {({ pages }) => (
      <Pagination.List>
        <Pagination.ListItem>
          <Pagination.PrevPageTrigger>Previous Page</Pagination.PrevPageTrigger>
        </Pagination.ListItem>
        {pages.map((page, index) =>
          page.type === 'page' ? (
            <Pagination.ListItem key={index}>
              <Pagination.PageTrigger {...page}>{page.value}</Pagination.PageTrigger>
            </Pagination.ListItem>
          ) : (
            <Pagination.ListItem key={index}>
              <Pagination.Ellipsis index={index}>&#8230;</Pagination.Ellipsis>
            </Pagination.ListItem>
          ),
        )}
        <Pagination.ListItem>
          <Pagination.NextPageTrigger>Next Page</Pagination.NextPageTrigger>
        </Pagination.ListItem>
      </Pagination.List>
    )}
  </Pagination.Root>
)

export const Controlled = () => {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <Pagination.Root
      count={5000}
      pageSize={10}
      siblingCount={2}
      page={currentPage}
      onPageChange={(details) => setCurrentPage(details.page)}
    >
      {/* ... */}
    </Pagination.Root>
  )
}

export const Customized = () => (
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
