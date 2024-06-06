import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'

export interface SegmentGroupLabelProps extends HTMLArkProps<'label'> {}

export const SegmentGroupLabel = (props: SegmentGroupLabelProps) => {
  const segmentGroup = useSegmentGroupContext()
  const mergedProps = mergeProps(
    () => segmentGroup().getLabelProps(),
    segmentGroupAnatomy.build().label.attrs,
    props,
  )

  return <ark.label {...mergedProps} />
}
