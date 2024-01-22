import * as Ark from '@ark-ui/react/src/pagination'
import { styled } from 'styled-system/jsx'
import { pagination, type PaginationVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(pagination)

export * from '@ark-ui/react/src/pagination'
export type PaginationProps = Ark.PaginationRootProps & PaginationVariantProps

const PaginationRoot = withProvider(styled(Ark.Pagination.Root), 'root')
export const PaginationEllipsis = withContext(styled(Ark.Pagination.Ellipsis), 'ellipsis')
export const PaginationNextTrigger = withContext(styled(Ark.Pagination.NextTrigger), 'nextTrigger')
export const PaginationItem = withContext(styled(Ark.Pagination.Item), 'item')
export const PaginationPrevTrigger = withContext(styled(Ark.Pagination.PrevTrigger), 'prevTrigger')

export const Pagination = Object.assign(PaginationRoot, {
  Root: PaginationRoot,
  Ellipsis: PaginationEllipsis,
  Item: PaginationItem,
  NextTrigger: PaginationNextTrigger,
  PrevTrigger: PaginationPrevTrigger,
})
