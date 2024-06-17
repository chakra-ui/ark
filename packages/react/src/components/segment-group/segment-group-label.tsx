import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/react'
import { type LabelHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'

export interface SegmentGroupLabelBaseProps extends PolymorphicProps {}
export interface SegmentGroupLabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    SegmentGroupLabelBaseProps {}

export const SegmentGroupLabel = forwardRef<HTMLLabelElement, SegmentGroupLabelProps>(
  (props, ref) => {
    const segmentGroup = useSegmentGroupContext()
    const mergedProps = mergeProps(
      segmentGroup.getLabelProps(),
      segmentGroupAnatomy.build().label.attrs as Record<string, string>,
      props,
    )

    return <ark.label {...mergedProps} ref={ref} />
  },
)

SegmentGroupLabel.displayName = 'SegmentGroupLabel'
