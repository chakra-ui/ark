import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useSegmentGroupContext } from './segment-group-context'
import { parts } from './segment-group.anatomy'

export type SegmentIndicatorProps = ComponentPropsWithoutRef<typeof ark.div>

export const SegmentIndicator = forwardRef<HTMLDivElement, SegmentIndicatorProps>((props, ref) => {
  const { indicatorProps } = useSegmentGroupContext()
  const mergedProps = mergeProps(indicatorProps, props)

  return <ark.div {...mergedProps} {...parts.indicator.attrs} ref={ref} />
})

SegmentIndicator.displayName = 'SegmentIndicator'
