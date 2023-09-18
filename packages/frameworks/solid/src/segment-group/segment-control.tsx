import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentContext } from './segment-context'
import { useSegmentGroupContext } from './segment-group-context'
import { parts } from './segment-group.anatomy'

export type SegmentControlProps = HTMLArkProps<'div'>

export const SegmentControl = (props: SegmentControlProps) => {
  const api = useSegmentGroupContext()
  const context = useSegmentContext()
  const mergedProps = mergeProps(() => api().getRadioControlProps(context), props)

  return <ark.div {...mergedProps} {...parts.radioControl.attrs} />
}
