import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentGroupContext } from './segment-group-context'
import { parts } from './segment-group.anatomy'

export type SegmentGroupLabelProps = HTMLArkProps<'label'>

export const SegmentGroupLabel = (props: SegmentGroupLabelProps) => {
  const api = useSegmentGroupContext()
  const labelProps = mergeProps(() => api().labelProps, props)

  return <ark.label {...labelProps} {...parts.label.attrs} />
}
