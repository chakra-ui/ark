import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import type { ItemProps } from '@zag-js/radio-group'
import { mergeProps } from '@zag-js/react'
import { type LabelHTMLAttributes, forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'
import { SegmentGroupItemProvider } from './use-segment-group-item-context'
import { SegmentGroupItemPropsProvider } from './use-segment-group-item-props-context'

export interface SegmentGroupItemBaseProps extends ItemProps, PolymorphicProps {}
export interface SegmentGroupItemProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    SegmentGroupItemBaseProps {}

export const SegmentGroupItem = forwardRef<HTMLLabelElement, SegmentGroupItemProps>(
  (props, ref) => {
    const [itemProps, localProps] = createSplitProps<ItemProps>()(props, [
      'value',
      'disabled',
      'invalid',
    ])
    const segmentGroup = useSegmentGroupContext()
    const mergedProps = mergeProps(
      segmentGroup.getItemProps(itemProps),
      segmentGroupAnatomy.build().item.attrs as Record<string, string>,
      localProps,
    )
    const itemState = segmentGroup.getItemState(itemProps)

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
