import type { ItemProps } from '@zag-js/pagination'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { usePaginationContext } from './pagination-context'

export interface PaginationItemProps extends Assign<HTMLArkProps<'button'>, ItemProps> {}

export const PaginationItem: ArkComponent<'button', ItemProps> = (props: PaginationItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['value', 'type'])

  const api = usePaginationContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)

  return <ark.button {...mergedProps} />
}
