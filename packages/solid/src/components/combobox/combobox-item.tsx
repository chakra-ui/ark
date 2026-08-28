import type { ItemProps } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useComboboxContext } from './use-combobox-context.ts'
import { ComboboxItemProvider } from './use-combobox-item-context.ts'
import { ComboboxItemPropsProvider } from './use-combobox-item-props-context.ts'

export interface ComboboxItemBaseProps extends ItemProps, PolymorphicProps<'div'> {}
export interface ComboboxItemProps extends HTMLProps<'div'>, ComboboxItemBaseProps {}

export const ComboboxItem = (props: ComboboxItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['item', 'persistFocus'])
  const api = useComboboxContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)
  const itemState = createMemo(() => api().getItemState(itemProps))

  return (
    <ComboboxItemPropsProvider value={itemProps}>
      <ComboboxItemProvider value={itemState}>
        <ark.div {...mergedProps} />
      </ComboboxItemProvider>
    </ComboboxItemPropsProvider>
  )
}
