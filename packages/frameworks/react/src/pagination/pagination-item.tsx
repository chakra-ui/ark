import type { ItemProps } from '@zag-js/pagination'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { usePaginationContext } from './use-pagination-context'

export interface PaginationItemProps extends Assign<HTMLArkProps<'button'>, ItemProps> {}

export const PaginationItem = forwardRef<HTMLButtonElement, PaginationItemProps>((props, ref) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['value', 'type'])
  const context = usePaginationContext()
  const mergedProps = mergeProps(context.getItemProps(itemProps), localProps)

  return <ark.button {...mergedProps} ref={ref} />
})

PaginationItem.displayName = 'PaginationItem'
