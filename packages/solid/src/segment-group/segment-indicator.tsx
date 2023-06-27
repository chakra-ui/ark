import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentGroupContext } from './segment-group-context'
import { parts } from './segment-group.anatomy'

export type SegmentIndicatorProps = HTMLArkProps<'input'>

export const SegmentIndicator = (props: SegmentIndicatorProps) => {
  const api = useSegmentGroupContext()
  const indicatorProps = mergeProps(() => api().indicatorProps, props)

  return <ark.input {...indicatorProps} {...parts.indicator.attrs} />
}
