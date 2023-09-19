import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentContext } from './segment-context'
import { useSegmentGroupContext } from './segment-group-context'

export type SegmentControlProps = HTMLArkProps<'div'>

export const SegmentControl = (props: SegmentControlProps) => {
  const api = useSegmentGroupContext()
  const context = useSegmentContext()
  const mergedProps = mergeProps(
    () => api().getRadioControlProps(context),
    segmentGroupAnatomy.build().radioControl.attrs,
    props,
  )

  return <ark.div {...mergedProps} />
}
