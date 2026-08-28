'use client'

import type { ItemProps } from '@zag-js/listbox'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useListboxContext } from './use-listbox-context.ts'
import { ListboxItemProvider } from './use-listbox-item-context.ts'
import { ListboxItemPropsProvider } from './use-listbox-item-props-context.ts'

export interface ListboxItemBaseProps extends ItemProps, PolymorphicProps {}
export interface ListboxItemProps extends HTMLProps<'div'>, ListboxItemBaseProps {}

const splitItemProps = createSplitProps<ItemProps>()

export const ListboxItem = forwardRef<HTMLDivElement, ListboxItemProps>((props, ref) => {
  const [itemProps, localProps] = splitItemProps(props, ['item', 'highlightOnHover'])
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
