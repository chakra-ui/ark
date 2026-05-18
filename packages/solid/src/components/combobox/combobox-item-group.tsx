import type { ItemGroupProps } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/solid'
import { createUniqueId } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useComboboxContext } from './use-combobox-context.ts'
import { ComboboxItemGroupPropsProvider } from './use-combobox-item-group-props-context.ts'

export interface ComboboxItemGroupBaseProps extends PolymorphicProps<'div'> {}
export interface ComboboxItemGroupProps extends HTMLProps<'div'>, ComboboxItemGroupBaseProps {}

export const ComboboxItemGroup = (props: ComboboxItemGroupProps) => {
  const [_itemGroupProps, localProps] = createSplitProps<Partial<ItemGroupProps>>()(props, ['id'])
  const combobox = useComboboxContext()
  const itemGroupProps = mergeProps({ id: createUniqueId() }, _itemGroupProps)
  const mergedProps = mergeProps(() => combobox().getItemGroupProps(itemGroupProps), localProps)

  return (
    <ComboboxItemGroupPropsProvider value={itemGroupProps}>
      <ark.div {...mergedProps} />
    </ComboboxItemGroupPropsProvider>
  )
}
