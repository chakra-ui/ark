import type { ItemProps } from '@zag-js/select'
import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { SelectItemPropsProvider, SelectItemProvider } from './use-select-item-context'

export interface SelectItemProps extends Assign<HTMLArkProps<'div'>, ItemProps> {}

export const SelectItem = (props: SelectItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['item'])
  const api = useSelectContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)
  const itemState = createMemo(() => api().getItemState(itemProps))

  return (
    <SelectItemPropsProvider value={itemProps}>
      <SelectItemProvider value={itemState}>
        <ark.div {...mergedProps} />
      </SelectItemProvider>
    </SelectItemPropsProvider>
  )
}
