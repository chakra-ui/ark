'use client'
import { forwardRef } from 'react'
import { Button } from './button'
import { IconButton } from './icon-button'
import * as ArkPagination from './primitives/pagination'

export interface PaginationProps extends ArkPagination.RootProps {}

export const Pagination = forwardRef<HTMLElement, PaginationProps>((props, ref) => {
  return (
    <ArkPagination.Root ref={ref} {...props}>
      <ArkPagination.PrevTrigger asChild>
        <IconButton variant="ghost" aria-label="Next Page">
          <ChevronLeftIcon />
        </IconButton>
      </ArkPagination.PrevTrigger>
      <ArkPagination.Context>
        {(pagination) =>
          pagination.pages.map((page, index) =>
            page.type === 'page' ? (
              <ArkPagination.Item key={index} {...page} asChild>
                <Button variant="outline">{page.value}</Button>
              </ArkPagination.Item>
            ) : (
              <ArkPagination.Ellipsis key={index} index={index}>
                &#8230;
              </ArkPagination.Ellipsis>
            ),
          )
        }
      </ArkPagination.Context>
      <ArkPagination.NextTrigger asChild>
        <IconButton variant="ghost" aria-label="Next Page">
          <ChevronRightIcon />
        </IconButton>
      </ArkPagination.NextTrigger>
    </ArkPagination.Root>
  )
})

Pagination.displayName = 'Pagination'

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <title>Chevron Left Icon</title>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m15 18l-6-6l6-6"
    />
  </svg>
)

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <title>Chevron Right Icon</title>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m9 18l6-6l-6-6"
    />
  </svg>
)
