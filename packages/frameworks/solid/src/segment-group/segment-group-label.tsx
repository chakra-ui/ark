import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useSegmentGroupContext } from './segment-group-context'

export interface SegmentGroupLabelProps extends HTMLArkProps<'label'> {}

export const SegmentGroupLabel: ArkComponent<'label'> = (props: SegmentGroupLabelProps) => {
  const api = useSegmentGroupContext()
  const mergedProps = mergeProps(
    () => api().labelProps,
    segmentGroupAnatomy.build().label.attrs,
    props,
  )

  return <ark.label {...mergedProps} />
}
