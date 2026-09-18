import type { ItemProps } from '@zag-js/cascade-select'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'

export interface CascadeSelectListBaseProps extends ItemProps, PolymorphicProps<'div'> {}
export interface CascadeSelectListProps extends HTMLProps<'div'>, CascadeSelectListBaseProps {}

export const CascadeSelectList = (props: CascadeSelectListProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['item', 'indexPath', 'value'])
  const context = useCascadeSelectContext()
  const mergedProps = mergeProps(() => context().getListProps(itemProps), localProps)
  return <ark.div {...mergedProps} />
}
