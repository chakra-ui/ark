import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentContext } from './segment-context'
import { useSegmentGroupContext } from './segment-group-context'
import { parts } from './segment-group.anatomy'

export type SegmentControlProps = HTMLArkProps<'div'>

export const SegmentControl = (props: SegmentControlProps) => {
  const api = useSegmentGroupContext()

  const segmentParams = useSegmentContext()
  const controlProps = mergeProps(() => api().getRadioControlProps(segmentParams), props)

  return <ark.div {...controlProps} {...parts.radioControl.attrs} />
}
