import { mergeProps } from '@zag-js/react'
import type { ItemProps, ItemState } from '@zag-js/select'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useSelectContext } from './select-context'
import { SelectItemProvider } from './select-item-context'

export interface SelectItemProps
  extends Assign<HTMLArkProps<'div'>, { children?: ReactNode | ((state: ItemState) => ReactNode) }>,
    ItemProps {}

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>((props, ref) => {
  const [itemProps, { children, ...localProps }] = createSplitProps<ItemProps>()(props, ['item'])

  const api = useSelectContext()
  const mergedProps = mergeProps(api.getItemProps(itemProps), localProps)

  const itemState = api.getItemState(itemProps)
  const view = runIfFn(children, itemState)

  return (
    <SelectItemProvider value={itemProps}>
      <ark.div {...mergedProps} ref={ref}>
        {view}
      </ark.div>
    </SelectItemProvider>
  )
})

SelectItem.displayName = 'SelectItem'
