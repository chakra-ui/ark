import * as Ark from '@ark-ui/react/pagination'
import { styled } from 'styled-system/jsx'
import { pagination, type PaginationVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(pagination)

export * from '@ark-ui/react/pagination'
export type PaginationProps = Ark.PaginationProps & PaginationVariantProps

const PaginationRoot = withProvider(styled(Ark.Pagination.Root), 'root')
export const PaginationEllipsis = withContext(styled(Ark.Pagination.Ellipsis), 'ellipsis')
export const PaginationList = withContext(styled(Ark.Pagination.List), 'list')
export const PaginationListItem = withContext(styled(Ark.Pagination.ListItem), 'listItem')
export const PaginationNextPageTrigger = withContext(
  styled(Ark.Pagination.NextPageTrigger),
  'nextPageTrigger',
)
export const PaginationPageTrigger = withContext(styled(Ark.Pagination.PageTrigger), 'pageTrigger')
export const PaginationPrevPageTrigger = withContext(
  styled(Ark.Pagination.PrevPageTrigger),
  'prevPageTrigger',
)

export const Pagination = Object.assign(PaginationRoot, {
  Root: PaginationRoot,
  Ellipsis: PaginationEllipsis,
  List: PaginationList,
  ListItem: PaginationListItem,
  NextPageTrigger: PaginationNextPageTrigger,
  PageTrigger: PaginationPageTrigger,
  PrevPageTrigger: PaginationPrevPageTrigger,
})
