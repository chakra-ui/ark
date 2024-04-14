import type { ItemProps } from '@zag-js/pagination'
import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { usePaginationContext } from './use-pagination-context'

export interface PaginationItemProps extends Assign<HTMLArkProps<'button'>, ItemProps> {}

export const PaginationItem = (props: PaginationItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['value', 'type'])

  const api = usePaginationContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)

  return <ark.button {...mergedProps} />
}
