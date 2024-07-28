'use client'
import type { Assign } from '@ark-ui/react'
import { Pagination } from '@ark-ui/react/pagination'
import { type PaginationVariantProps, pagination } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(pagination)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider<
  HTMLElement,
  Assign<Assign<HTMLStyledProps<'nav'>, Pagination.RootProviderBaseProps>, PaginationVariantProps>
>(Pagination.RootProvider, 'root')

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLElement,
  Assign<Assign<HTMLStyledProps<'nav'>, Pagination.RootBaseProps>, PaginationVariantProps>
>(Pagination.Root, 'root')

export const Ellipsis = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Pagination.EllipsisBaseProps>
>(Pagination.Ellipsis, 'ellipsis')

export const Item = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, Pagination.ItemBaseProps>
>(Pagination.Item, 'item')

export const NextTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, Pagination.NextTriggerBaseProps>
>(Pagination.NextTrigger, 'nextTrigger')

export const PrevTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, Pagination.PrevTriggerBaseProps>
>(Pagination.PrevTrigger, 'prevTrigger')

export { PaginationContext as Context } from '@ark-ui/react/pagination'
