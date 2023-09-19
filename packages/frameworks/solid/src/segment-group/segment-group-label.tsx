import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentGroupContext } from './segment-group-context'

export type SegmentGroupLabelProps = HTMLArkProps<'label'>

export const SegmentGroupLabel = (props: SegmentGroupLabelProps) => {
  const api = useSegmentGroupContext()
  const mergedProps = mergeProps(() => api().labelProps, segmentGroupAnatomy.build().label, props)

  return <ark.label {...mergedProps} />
}
