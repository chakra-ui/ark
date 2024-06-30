import { mergeProps } from '@zag-js/react'
import { anatomy } from '@zag-js/segmentGroup'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'

export interface SegmentGroupLabelBaseProps extends PolymorphicProps {}
export interface SegmentGroupLabelProps extends HTMLProps<'label'>, SegmentGroupLabelBaseProps {}

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
