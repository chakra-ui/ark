import type { ItemGroupProps } from '@zag-js/listbox'
import { mergeProps } from '@zag-js/react'
import { forwardRef, useId } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useListboxContext } from './use-listbox-context'
import { ListboxItemGroupPropsProvider } from './use-listbox-item-group-props'

export interface ListboxItemGroupBaseProps extends PolymorphicProps {}
export interface ListboxItemGroupProps extends HTMLProps<'div'>, ListboxItemGroupBaseProps {}

export const ListboxItemGroup = forwardRef<HTMLDivElement, ListboxItemGroupProps>((props, ref) => {
  const id = useId()
  const [_itemGroupProps, localProps] = createSplitProps<Partial<ItemGroupProps>>()(props, ['id'])
  const itemGroupProps = { id, ..._itemGroupProps }

  const listbox = useListboxContext()
  const mergedProps = mergeProps(listbox.getItemGroupProps(itemGroupProps), localProps)

  return (
    <ListboxItemGroupPropsProvider value={itemGroupProps}>
      <ark.div {...mergedProps} ref={ref} />
    </ListboxItemGroupPropsProvider>
  )
})

ListboxItemGroup.displayName = 'ListboxItemGroup'
