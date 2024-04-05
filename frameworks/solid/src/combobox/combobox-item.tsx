import type { ItemProps } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useComboboxContext } from './use-combobox-context'
import { ComboboxItemPropsProvider, ComboboxItemProvider } from './use-combobox-item-context'

export interface ComboboxItemProps extends Assign<HTMLArkProps<'div'>, ItemProps> {}

export const ComboboxItem = (props: ComboboxItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['item'])
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
