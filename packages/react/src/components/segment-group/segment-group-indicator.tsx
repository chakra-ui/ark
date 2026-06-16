'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useSegmentGroupContext } from './use-segment-group-context.ts'

export interface SegmentGroupIndicatorBaseProps extends PolymorphicProps {}
export interface SegmentGroupIndicatorProps extends HTMLProps<'div'>, SegmentGroupIndicatorBaseProps {}

export const SegmentGroupIndicator = forwardRef<HTMLDivElement, SegmentGroupIndicatorProps>((props, ref) => {
  const segmentGroup = useSegmentGroupContext()
  const mergedProps = mergeProps(segmentGroup.getIndicatorProps(), props)
  return <ark.div {...mergedProps} ref={ref} />
})

SegmentGroupIndicator.displayName = 'SegmentGroupIndicator'
