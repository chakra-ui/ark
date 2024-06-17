import type { ItemGroupProps } from '@zag-js/select'
import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createUniqueId } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { SelectItemGroupPropsProvider } from './use-select-item-group-props-context'

export interface SelectItemGroupBaseProps extends PolymorphicProps<'div'> {}
export interface SelectItemGroupProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    SelectItemGroupBaseProps {}

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
