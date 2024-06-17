import type { ItemProps } from '@zag-js/pagination'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePaginationContext } from './use-pagination-context'

export interface PaginationItemBaseProps extends ItemProps, PolymorphicProps {}
export interface PaginationItemProps extends Assign<HTMLProps<'button'>, PaginationItemBaseProps> {}

export const PaginationItem = forwardRef<HTMLButtonElement, PaginationItemProps>((props, ref) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['value', 'type'])
  const pagination = usePaginationContext()
  const mergedProps = mergeProps(pagination.getItemProps(itemProps), localProps)

  return <ark.button {...mergedProps} ref={ref} />
})

PaginationItem.displayName = 'PaginationItem'
