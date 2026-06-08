'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useSegmentGroupContext } from './use-segment-group-context.ts'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context.ts'

export interface SegmentGroupItemTextBaseProps extends PolymorphicProps {}
export interface SegmentGroupItemTextProps extends HTMLProps<'span'>, SegmentGroupItemTextBaseProps {}

export const SegmentGroupItemText = forwardRef<HTMLSpanElement, SegmentGroupItemTextProps>((props, ref) => {
  const segmentGroup = useSegmentGroupContext()
  const itemProps = useSegmentGroupItemPropsContext()
  const mergedProps = mergeProps(segmentGroup.getItemTextProps(itemProps), props)

  return <ark.span {...mergedProps} ref={ref} />
})

SegmentGroupItemText.displayName = 'SegmentGroupItemText'
