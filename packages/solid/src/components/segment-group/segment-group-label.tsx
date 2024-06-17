import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'

export interface SegmentGroupLabelBaseProps extends PolymorphicProps<'label'> {}
export interface SegmentGroupLabelProps
  extends JSX.LabelHTMLAttributes<HTMLLabelElement>,
    SegmentGroupLabelBaseProps {}

export const SegmentGroupLabel = (props: SegmentGroupLabelProps) => {
  const segmentGroup = useSegmentGroupContext()
  const mergedProps = mergeProps(
    () => segmentGroup().getLabelProps(),
    segmentGroupAnatomy.build().label.attrs,
    props,
  )

  return <ark.label {...mergedProps} />
}
