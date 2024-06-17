import type { ItemProps } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/solid'
import { type JSX, createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'
import { ComboboxItemProvider } from './use-combobox-item-context'
import { ComboboxItemPropsProvider } from './use-combobox-item-props-context'

export interface ComboboxItemBaseProps extends ItemProps, PolymorphicProps<'div'> {}
export interface ComboboxItemProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    ComboboxItemBaseProps {}

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
