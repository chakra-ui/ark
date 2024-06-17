import type { ItemProps } from '@zag-js/pagination'
import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { usePaginationContext } from './use-pagination-context'

export interface PaginationItemBaseProps extends ItemProps, PolymorphicProps<'button'> {}
export interface PaginationItemProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    PaginationItemBaseProps {}

export const PaginationItem = (props: PaginationItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['value', 'type'])

  const api = usePaginationContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)

  return <ark.button {...mergedProps} />
}
