import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useSegmentGroupContext } from './segment-group-context'

export interface SegmentGroupIndicatorProps extends HTMLArkProps<'div'> {}

export const SegmentGroupIndicator: ArkComponent<'div'> = (props) => {
  const api = useSegmentGroupContext()
  const mergedProps = mergeProps(
    () => api().indicatorProps,
    segmentGroupAnatomy.build().indicator.attrs,
    props,
  )

  return <ark.div {...mergedProps} />
}
