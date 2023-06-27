import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentContext } from './segment-context'
import { useSegmentGroupContext } from './segment-group-context'
import { parts } from './segment-group.anatomy'

export type SegmentLabelProps = HTMLArkProps<'span'>

export const SegmentLabel = (props: SegmentLabelProps) => {
  const api = useSegmentGroupContext()
  const segmentParams = useSegmentContext()
  const labelProps = mergeProps(() => api().getRadioLabelProps(segmentParams), props)

  return <ark.span {...labelProps} {...parts.radioLabel.attrs} />
}
