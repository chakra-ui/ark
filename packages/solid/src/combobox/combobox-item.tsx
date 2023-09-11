import type { ItemProps, ItemState } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useComboboxContext } from './combobox-context'
import { ComboboxItemProvider } from './combobox-item-context'

export type ComboboxItemProps = Assign<
  HTMLArkProps<'div'>,
  ItemProps & {
    children?: JSX.Element | ((state: () => ItemState) => JSX.Element)
  }
>

export const ComboboxItem = (props: ComboboxItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['item'])
  const api = useComboboxContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)
  const getChildren = () => runIfFn(localProps.children, () => api().getItemState(itemProps))

  return (
    <ComboboxItemProvider value={itemProps}>
      <ark.div {...mergedProps}>{getChildren()}</ark.div>
    </ComboboxItemProvider>
  )
}
