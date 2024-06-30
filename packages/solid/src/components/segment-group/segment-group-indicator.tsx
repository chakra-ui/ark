import { anatomy } from '@zag-js/segmentGroup'
import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'

export interface SegmentGroupIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface SegmentGroupIndicatorProps
  extends HTMLProps<'div'>,
    SegmentGroupIndicatorBaseProps {}

export const SegmentGroupIndicator = (props: SegmentGroupIndicatorProps) => {
  const segmentGroup = useSegmentGroupContext()
  const mergedProps = mergeProps(
    () => segmentGroup().getIndicatorProps(),
    segmentGroupAnatomy.build().indicator.attrs,
    props,
  )

  return <ark.div {...mergedProps} />
}
