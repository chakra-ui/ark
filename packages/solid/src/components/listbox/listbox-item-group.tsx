import type { ItemGroupProps } from '@zag-js/listbox'
import { mergeProps } from '@zag-js/solid'
import { createUniqueId } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useListboxContext } from './use-listbox-context'
import { ListboxItemGroupPropsProvider } from './use-listbox-item-group-props-context'

export interface ListboxItemGroupBaseProps extends PolymorphicProps<'div'> {}
export interface ListboxItemGroupProps extends HTMLProps<'div'>, ListboxItemGroupBaseProps {}

export const ListboxItemGroup = (props: ListboxItemGroupProps) => {
  const id = createUniqueId()
  const [_itemGroupProps, localProps] = createSplitProps<Partial<ItemGroupProps>>()(props, ['id'])
  const itemGroupProps = { id, ..._itemGroupProps }

  const listbox = useListboxContext()
  const mergedProps = mergeProps(() => listbox().getItemGroupProps(itemGroupProps), localProps)

  return (
    <ListboxItemGroupPropsProvider value={itemGroupProps}>
      <ark.div {...mergedProps} />
    </ListboxItemGroupPropsProvider>
  )
}
