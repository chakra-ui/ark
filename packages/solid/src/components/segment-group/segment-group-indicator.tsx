import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'

export interface SegmentGroupIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface SegmentGroupIndicatorProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
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
