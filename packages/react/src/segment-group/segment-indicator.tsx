import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useSegmentGroupContext } from './segment-group-context'
import { parts } from './segment-group.anatomy'

export type SegmentIndicatorProps = HTMLArkProps<'div'>

export const SegmentIndicator = forwardRef<'div'>((props, ref) => {
  const { indicatorProps } = useSegmentGroupContext()
  const mergedProps = mergeProps(indicatorProps, props)

  return <ark.div {...mergedProps} {...parts.indicator.attrs} ref={ref} />
})
