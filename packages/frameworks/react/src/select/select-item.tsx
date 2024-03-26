import { mergeProps } from '@zag-js/react'
import type { ItemProps } from '@zag-js/select'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSelectContext } from './use-select-context'
import { SelectItemProvider } from './use-select-item-context'

export interface SelectItemProps extends Assign<HTMLArkProps<'div'>, ItemProps> {}

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>((props, ref) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['item'])
  const context = useSelectContext()
  const mergedProps = mergeProps(context.getItemProps(itemProps), localProps)

  return (
    <SelectItemProvider value={itemProps}>
      <ark.div {...mergedProps} ref={ref} />
    </SelectItemProvider>
  )
})

SelectItem.displayName = 'SelectItem'
