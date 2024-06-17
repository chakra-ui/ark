import { mergeProps } from '@zag-js/react'
import type { ItemProps } from '@zag-js/select'
import { type HTMLAttributes, forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { SelectItemProvider } from './use-select-item-context'
import { SelectItemPropsProvider } from './use-select-item-props-context'

export interface SelectItemBaseProps extends ItemProps, PolymorphicProps {}
export interface SelectItemProps extends HTMLAttributes<HTMLDivElement>, SelectItemBaseProps {}

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>((props, ref) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['item', 'persistFocus'])
  const select = useSelectContext()
  const mergedProps = mergeProps(select.getItemProps(itemProps), localProps)
  const itemState = select.getItemState(itemProps)

  return (
    <SelectItemPropsProvider value={itemProps}>
      <SelectItemProvider value={itemState}>
        <ark.div {...mergedProps} ref={ref} />
      </SelectItemProvider>
    </SelectItemPropsProvider>
  )
})

SelectItem.displayName = 'SelectItem'
