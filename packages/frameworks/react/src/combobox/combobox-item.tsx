import type { ItemProps } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { useComboboxContext } from './combobox-context'
import { ComboboxItemProvider } from './combobox-item-context'

export interface ComboboxItemProps
  extends Assign<ComponentPropsWithoutRef<typeof ark.div>, ItemProps> {}

export const ComboboxItem = forwardRef<HTMLDivElement, ComboboxItemProps>((props, ref) => {
  const [itemProps, { children, ...localProps }] = createSplitProps<ItemProps>()(props, ['item'])
  const api = useComboboxContext()
  const mergedProps = mergeProps(api.getItemProps(itemProps), localProps)

  const itemState = api.getItemState(itemProps)
  const view = runIfFn(children, itemState)

  return (
    <ComboboxItemProvider value={itemProps}>
      <ark.div {...mergedProps} ref={ref}>
        {view}
      </ark.div>
    </ComboboxItemProvider>
  )
})

ComboboxItem.displayName = 'ComboboxItem'
