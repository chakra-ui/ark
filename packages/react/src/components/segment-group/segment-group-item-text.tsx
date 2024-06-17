import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context'

export interface SegmentGroupItemTextBaseProps extends PolymorphicProps {}
export interface SegmentGroupItemTextProps
  extends HTMLAttributes<HTMLSpanElement>,
    SegmentGroupItemTextBaseProps {}

export const SegmentGroupItemText = forwardRef<HTMLSpanElement, SegmentGroupItemTextProps>(
  (props, ref) => {
    const segmentGroup = useSegmentGroupContext()
    const itemProps = useSegmentGroupItemPropsContext()
    const mergedProps = mergeProps(
      segmentGroup.getItemTextProps(itemProps),
      segmentGroupAnatomy.build().itemText.attrs as Record<string, string>,
      props,
    )

    return <ark.span {...mergedProps} ref={ref} />
  },
)

SegmentGroupItemText.displayName = 'SegmentGroupItemText'
