import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import type { ItemProps } from '@zag-js/radio-group'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSegmentGroupContext } from './use-segment-group-context'
import {
  SegmentGroupItemPropsProvider,
  SegmentGroupItemProvider,
} from './use-segment-group-item-context'

export interface SegmentGroupItemProps extends Assign<HTMLArkProps<'label'>, ItemProps> {}

export const SegmentGroupItem = forwardRef<HTMLLabelElement, SegmentGroupItemProps>(
  (props, ref) => {
    const [itemProps, localProps] = createSplitProps<ItemProps>()(props, [
      'value',
      'disabled',
      'invalid',
    ])
    const context = useSegmentGroupContext()
    const mergedProps = mergeProps(
      context.getItemProps(itemProps),
      segmentGroupAnatomy.build().item.attrs as Record<string, string>,
      localProps,
    )
    const itemState = context.getItemState(itemProps)

    return (
      <SegmentGroupItemPropsProvider value={itemProps}>
        <SegmentGroupItemProvider value={itemState}>
          <ark.label {...mergedProps} ref={ref} />
        </SegmentGroupItemProvider>
      </SegmentGroupItemPropsProvider>
    )
  },
)

SegmentGroupItem.displayName = 'SegmentGroupItem'
