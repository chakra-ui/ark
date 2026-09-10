import type { ItemProps, ItemState } from '@zag-js/select'
import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useSelectContext } from './use-select-context.ts'
import { SelectItemProvider } from './use-select-item-context.ts'
import { SelectItemPropsProvider } from './use-select-item-props-context.ts'

export interface SelectItemState extends ItemState {}

export interface SelectItemBaseProps extends ItemProps, PolymorphicProps<'div', SelectItemState> {}
export interface SelectItemProps extends HTMLProps<'div'>, SelectItemBaseProps {}

export const SelectItem = (props: SelectItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['item', 'persistFocus'])
  const select = useSelectContext()
  const mergedProps = mergeProps(() => select().getItemProps(itemProps), localProps)
  const itemState = createMemo(() => select().getItemState(itemProps))

  return (
    <SelectItemPropsProvider value={itemProps}>
      <SelectItemProvider value={itemState}>
        <ark.div {...mergedProps} state={select().getItemState(itemProps)} />
      </SelectItemProvider>
    </SelectItemPropsProvider>
  )
}
