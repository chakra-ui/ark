import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentGroupContext } from './segment-group-context'

export type SegmentGroupIndicatorProps = HTMLArkProps<'input'>

export const SegmentGroupIndicator = (props: SegmentGroupIndicatorProps) => {
  const api = useSegmentGroupContext()
  const mergedProps = mergeProps(
    () => api().indicatorProps,
    segmentGroupAnatomy.build().indicator,
    props,
  )

  return <ark.input {...mergedProps} />
}
