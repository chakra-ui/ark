'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { parts } from './segment-group.anatomy'
import { useSegmentGroupContext } from './use-segment-group-context'

export interface SegmentGroupLabelBaseProps extends PolymorphicProps {}
export interface SegmentGroupLabelProps extends HTMLProps<'span'>, SegmentGroupLabelBaseProps {}

export const SegmentGroupLabel = forwardRef<HTMLSpanElement, SegmentGroupLabelProps>((props, ref) => {
  const segmentGroup = useSegmentGroupContext()
  const mergedProps = mergeProps(segmentGroup.getLabelProps(), parts.label.attrs as Record<string, string>, props)

  return <ark.span {...mergedProps} ref={ref} />
})

SegmentGroupLabel.displayName = 'SegmentGroupLabel'
