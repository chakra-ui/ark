'use client'

import { mergeProps } from '@zag-js/react'
import type { VirtualItem } from '@zag-js/virtualizer'
import { forwardRef } from 'react'
import { useComposedRefs } from '../../utils/compose-refs.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useListVirtualizerContext } from './use-list-virtualizer-context.ts'

interface ItemProps {
  /**
   * The virtual item to render.
   */
  item: VirtualItem
  /**
   * Whether to measure the rendered size of the item and use it instead of the estimate.
   * @default false
   */
  measure?: boolean | undefined
}

export interface ListVirtualizerItemBaseProps extends ItemProps, PolymorphicProps {}

export interface ListVirtualizerItemProps extends HTMLProps<'div'>, ListVirtualizerItemBaseProps {}

const splitItemProps = createSplitProps<ItemProps>()

export const ListVirtualizerItem = forwardRef<HTMLDivElement, ListVirtualizerItemProps>((props, ref) => {
  const [{ item, measure }, localProps] = splitItemProps(props, ['item', 'measure'])
  const virtualizer = useListVirtualizerContext()
  const composedRef = useComposedRefs(measure ? item.measureElement : undefined, ref)
  const mergedProps = mergeProps(
    { ...virtualizer.getItemAriaAttrs(item.index), style: virtualizer.getItemStyle(item) },
    localProps,
  )

  return <ark.div {...mergedProps} data-index={item.index} ref={composedRef} />
})

ListVirtualizerItem.displayName = 'ListVirtualizerItem'
