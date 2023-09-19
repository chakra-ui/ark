import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentContext } from './segment-context'
import { useSegmentGroupContext } from './segment-group-context'

export type SegmentLabelProps = HTMLArkProps<'span'>

export const SegmentLabel = (props: SegmentLabelProps) => {
  const api = useSegmentGroupContext()
  const segmentParams = useSegmentContext()
  const mergedProps = mergeProps(
    () => api().getRadioLabelProps(segmentParams),
    segmentGroupAnatomy.build().radioLabel.attrs,
    props,
  )

  return <ark.span {...mergedProps} />
}
