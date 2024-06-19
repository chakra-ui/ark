import type { ItemProps } from '@zag-js/select'
import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { SelectItemProvider } from './use-select-item-context'
import { SelectItemPropsProvider } from './use-select-item-props-context'

export interface SelectItemBaseProps extends ItemProps, PolymorphicProps<'div'> {}
export interface SelectItemProps extends HTMLProps<'div'>, SelectItemBaseProps {}

export const SelectItem = (props: SelectItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['item', 'persistFocus'])
  const select = useSelectContext()
  const mergedProps = mergeProps(() => select().getItemProps(itemProps), localProps)
  const itemState = createMemo(() => select().getItemState(itemProps))

  return (
    <SelectItemPropsProvider value={itemProps}>
      <SelectItemProvider value={itemState}>
        <ark.div {...mergedProps} />
      </SelectItemProvider>
    </SelectItemPropsProvider>
  )
}
