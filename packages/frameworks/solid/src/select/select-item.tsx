import type { ItemProps, ItemState } from '@zag-js/select'
import { mergeProps } from '@zag-js/solid'
import { type Accessor, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useSelectContext } from './select-context'
import { SelectItemProvider } from './select-item-context'

interface ElementProps extends ItemProps {
  children?: JSX.Element | ((state: Accessor<ItemState>) => JSX.Element)
}

export interface SelectItemProps extends Assign<HTMLArkProps<'div'>, ElementProps> {}

export const SelectItem: ArkComponent<'div', SelectItemProps> = (props: SelectItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['item'])
  const api = useSelectContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)
  const getChildren = () => runIfFn(localProps.children, () => api().getItemState(itemProps))

  return (
    <SelectItemProvider value={itemProps}>
      <ark.div {...mergedProps}>{getChildren()}</ark.div>
    </SelectItemProvider>
  )
}
