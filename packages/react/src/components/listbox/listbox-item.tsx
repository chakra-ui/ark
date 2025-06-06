import type { ItemProps } from '@zag-js/listbox'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useListboxContext } from './use-listbox-context'
import { ListboxItemProvider } from './use-listbox-item-context'
import { ListboxItemPropsProvider } from './use-listbox-item-props-context'

export interface ListboxItemBaseProps extends ItemProps, PolymorphicProps {}
export interface ListboxItemProps extends HTMLProps<'div'>, ListboxItemBaseProps {}

export const ListboxItem = forwardRef<HTMLDivElement, ListboxItemProps>((props, ref) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['item', 'highlightOnHover'])
  const listbox = useListboxContext()
  const mergedProps = mergeProps(listbox.getItemProps(itemProps), localProps)
  const itemState = listbox.getItemState(itemProps)

  return (
    <ListboxItemPropsProvider value={itemProps}>
      <ListboxItemProvider value={itemState}>
        <ark.div {...mergedProps} ref={ref} />
      </ListboxItemProvider>
    </ListboxItemPropsProvider>
  )
})

ListboxItem.displayName = 'ListboxItem'
