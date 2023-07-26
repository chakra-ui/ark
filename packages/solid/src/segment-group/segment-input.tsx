import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentContext } from './segment-context'
import { useSegmentGroupContext } from './segment-group-context'
import { parts } from './segment-group.anatomy'

export type SegmentInputProps = HTMLArkProps<'input'>

export const SegmentInput = (props: SegmentInputProps) => {
  const api = useSegmentGroupContext()
  const segmentParams = useSegmentContext()
  const inputProps = mergeProps(() => api().getRadioInputProps(segmentParams), props)

  return <ark.input {...inputProps} {...parts.radioInput.attrs} />
}
