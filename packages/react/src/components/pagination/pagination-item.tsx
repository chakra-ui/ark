'use client'

import type { ItemProps, ItemState } from '@zag-js/pagination'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { usePaginationContext } from './use-pagination-context.ts'

export interface PaginationItemState extends ItemState {}

export interface PaginationItemBaseProps extends ItemProps, PolymorphicProps<PaginationItemState> {}
export interface PaginationItemProps extends Assign<HTMLProps<'button'>, PaginationItemBaseProps> {}

const splitItemProps = createSplitProps<ItemProps>()

export const PaginationItem = forwardRef<HTMLButtonElement, PaginationItemProps>((props, ref) => {
  const [itemProps, localProps] = splitItemProps(props, ['value', 'type'])
  const pagination = usePaginationContext()
  const mergedProps = mergeProps(pagination.getItemProps(itemProps), localProps)

  return <ark.button {...mergedProps} ref={ref} state={pagination.getItemState(itemProps)} />
})

PaginationItem.displayName = 'PaginationItem'
