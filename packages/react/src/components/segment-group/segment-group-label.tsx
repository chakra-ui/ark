'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useSegmentGroupContext } from './use-segment-group-context.ts'

export interface SegmentGroupLabelBaseProps extends PolymorphicProps {}
export interface SegmentGroupLabelProps extends HTMLProps<'span'>, SegmentGroupLabelBaseProps {}

export const SegmentGroupLabel = forwardRef<HTMLSpanElement, SegmentGroupLabelProps>((props, ref) => {
  const segmentGroup = useSegmentGroupContext()
  const mergedProps = mergeProps(segmentGroup.getLabelProps(), props)

  return <ark.span {...mergedProps} ref={ref} />
})

SegmentGroupLabel.displayName = 'SegmentGroupLabel'
