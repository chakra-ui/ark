import { mergeProps, normalizeProps } from '@zag-js/solid'
import type { VirtualItem } from '@zag-js/virtualizer'
import type { Assign } from '../../types.ts'
import { composeRefs } from '../../utils/compose-refs.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
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

export interface ListVirtualizerItemBaseProps extends ItemProps, PolymorphicProps<'div'> {}
export interface ListVirtualizerItemProps extends Assign<HTMLProps<'div'>, ListVirtualizerItemBaseProps> {}

const splitItemProps = createSplitProps<ItemProps>()

export const ListVirtualizerItem = (props: ListVirtualizerItemProps) => {
  const [itemProps, localProps] = splitItemProps(props, ['item', 'measure'])
  const virtualizer = useListVirtualizerContext()
  const mergedProps = mergeProps(
    () => ({
      ...virtualizer.getItemAriaAttrs(itemProps.item.index),
      style: normalizeProps.style(virtualizer.getItemStyle(itemProps.item)),
    }),
    localProps,
  )

  const measureRef = (element: HTMLElement | null) => {
    if (itemProps.measure) itemProps.item.measureElement(element)
  }

  return <ark.div {...mergedProps} data-index={itemProps.item.index} ref={composeRefs(measureRef, localProps.ref)} />
}
