import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'

export interface SegmentGroupIndicatorProps extends HTMLArkProps<'div'> {}

export const SegmentGroupIndicator = (props: SegmentGroupIndicatorProps) => {
  const segmentGroup = useSegmentGroupContext()
  const mergedProps = mergeProps(
    () => segmentGroup().indicatorProps,
    segmentGroupAnatomy.build().indicator.attrs,
    props,
  )

  return <ark.div {...mergedProps} />
}
