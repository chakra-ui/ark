'use client'

import type { ItemProps } from '@zag-js/pagination'
import { mergeProps } from '@zag-js/react'
import { type Ref, forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { usePaginationContext } from './use-pagination-context.ts'

export interface PaginationItemBaseProps extends ItemProps, PolymorphicProps {}
export interface PaginationItemProps extends Assign<HTMLProps<'button'>, PaginationItemBaseProps> {}

const splitItemProps = createSplitProps<ItemProps>()

export const PaginationItem = forwardRef<HTMLButtonElement | HTMLAnchorElement, PaginationItemProps>((props, ref) => {
  const [itemProps, localProps] = splitItemProps(props, ['value', 'type'])
  const pagination = usePaginationContext()
  const mergedProps = mergeProps(pagination.getItemProps(itemProps), localProps)

  if (pagination.type === 'link') return <ark.a {...mergedProps} ref={ref as Ref<HTMLAnchorElement>} />

  return <ark.button {...mergedProps} ref={ref as Ref<HTMLButtonElement>} />
})

PaginationItem.displayName = 'PaginationItem'
