import type { ItemGroupProps } from '@zag-js/select'
import { mergeProps } from '@zag-js/solid'
import { createUniqueId } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { SelectItemGroupPropsProvider } from './use-select-item-group-props-context'

export interface SelectItemGroupProps extends HTMLArkProps<'div'> {}

export const SelectItemGroup = (props: SelectItemGroupProps) => {
  const [_itemGroupProps, localProps] = createSplitProps<Partial<ItemGroupProps>>()(props, ['id'])
  const select = useSelectContext()
  const itemGroupProps = mergeProps({ id: createUniqueId() }, _itemGroupProps)
  const mergedProps = mergeProps(() => select().getItemGroupProps(itemGroupProps), localProps)

  return (
    <SelectItemGroupPropsProvider value={itemGroupProps}>
      <ark.div {...mergedProps} />
    </SelectItemGroupPropsProvider>
  )
}
