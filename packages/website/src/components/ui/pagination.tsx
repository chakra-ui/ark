import * as Ark from '@ark-ui/react/src/pagination'
import { styled } from 'styled-system/jsx'
import { pagination, type PaginationVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(pagination)

export * from '@ark-ui/react/src/pagination'
export type PaginationProps = Ark.PaginationProps & PaginationVariantProps

const PaginationRoot = withProvider(styled(Ark.Pagination.Root), 'root')
export const PaginationEllipsis = withContext(styled(Ark.Pagination.Ellipsis), 'ellipsis')
// export const PaginationList = withContext(styled(Ark.Pagination.List), 'list')
// export const PaginationListItem = withContext(styled(Ark.Pagination.ListItem), 'listItem')
export const PaginationNextTrigger = withContext(
  styled(Ark.Pagination.NextTrigger),
  'nextPageTrigger',
)
export const PaginationItem = withContext(styled(Ark.Pagination.Item), 'pageTrigger')
export const PaginationPrevTrigger = withContext(
  styled(Ark.Pagination.PrevTrigger),
  'prevPageTrigger',
)

export const Pagination = Object.assign(PaginationRoot, {
  Root: PaginationRoot,
  Ellipsis: PaginationEllipsis,
  // List: PaginationList,
  // ListItem: PaginationListItem,
  NextTrigger: PaginationNextTrigger,
  Item: PaginationItem,
  PrevTrigger: PaginationPrevTrigger,
})
