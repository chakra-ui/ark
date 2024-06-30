import { anatomy } from '@zag-js/segmentGroup'
import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'

export interface SegmentGroupLabelBaseProps extends PolymorphicProps<'label'> {}
export interface SegmentGroupLabelProps extends HTMLProps<'label'>, SegmentGroupLabelBaseProps {}

export const SegmentGroupLabel = (props: SegmentGroupLabelProps) => {
  const segmentGroup = useSegmentGroupContext()
  const mergedProps = mergeProps(
    () => segmentGroup().getLabelProps(),
    segmentGroupAnatomy.build().label.attrs,
    props,
  )

  return <ark.label {...mergedProps} />
}
