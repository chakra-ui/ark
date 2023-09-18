import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentGroupContext } from './segment-group-context'
import { parts } from './segment-group.anatomy'

export type SegmentGroupIndicatorProps = HTMLArkProps<'input'>

export const SegmentGroupIndicator = (props: SegmentGroupIndicatorProps) => {
  const api = useSegmentGroupContext()
  const indicatorProps = mergeProps(() => api().indicatorProps, props)

  return <ark.input {...indicatorProps} {...parts.indicator.attrs} />
}
