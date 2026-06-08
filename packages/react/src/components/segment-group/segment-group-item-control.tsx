'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useSegmentGroupContext } from './use-segment-group-context.ts'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context.ts'

export interface SegmentGroupItemControlBaseProps extends PolymorphicProps {}
export interface SegmentGroupItemControlProps extends HTMLProps<'div'>, SegmentGroupItemControlBaseProps {}

export const SegmentGroupItemControl = forwardRef<HTMLDivElement, SegmentGroupItemControlProps>((props, ref) => {
  const segmentGroup = useSegmentGroupContext()
  const itemProps = useSegmentGroupItemPropsContext()
  const mergedProps = mergeProps(segmentGroup.getItemControlProps(itemProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

SegmentGroupItemControl.displayName = 'SegmentGroupItemControl'
