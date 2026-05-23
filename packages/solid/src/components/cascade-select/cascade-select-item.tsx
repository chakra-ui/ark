import type { ItemProps } from '@zag-js/cascade-select'
import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'
import { CascadeSelectItemProvider } from './use-cascade-select-item-context'
import { CascadeSelectItemPropsProvider } from './use-cascade-select-item-props-context'

export interface CascadeSelectItemBaseProps extends ItemProps, PolymorphicProps<'div'> {}
export interface CascadeSelectItemProps extends HTMLProps<'div'>, CascadeSelectItemBaseProps {}

export const CascadeSelectItem = (props: CascadeSelectItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['item', 'indexPath', 'value'])
  const context = useCascadeSelectContext()
  const mergedProps = mergeProps(() => context().getItemProps(itemProps), localProps)
  const itemState = createMemo(() => context().getItemState(itemProps))

  return (
    <CascadeSelectItemPropsProvider value={itemProps}>
      <CascadeSelectItemProvider value={itemState}>
        <ark.div {...mergedProps} />
      </CascadeSelectItemProvider>
    </CascadeSelectItemPropsProvider>
  )
}
