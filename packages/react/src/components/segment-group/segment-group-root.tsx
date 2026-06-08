'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { type UseSegmentGroupProps, useSegmentGroup } from './use-segment-group.ts'
import { SegmentGroupProvider } from './use-segment-group-context.ts'

export interface SegmentGroupRootBaseProps extends UseSegmentGroupProps, PolymorphicProps {}
export interface SegmentGroupRootProps extends Assign<HTMLProps<'div'>, SegmentGroupRootBaseProps> {}

const splitRootProps = createSplitProps<UseSegmentGroupProps>()

export const SegmentGroupRoot = forwardRef<HTMLDivElement, SegmentGroupRootProps>((props, ref) => {
  const [useSegmentGroupProps, localProps] = splitRootProps(props, [
    'defaultValue',
    'disabled',
    'form',
    'id',
    'ids',
    'invalid',
    'name',
    'onValueChange',
    'orientation',
    'readOnly',
    'required',
    'value',
  ])
  const segmentGroup = useSegmentGroup(useSegmentGroupProps)
  const mergedProps = mergeProps(segmentGroup.getRootProps(), localProps)

  return (
    <SegmentGroupProvider value={segmentGroup}>
      <ark.div {...mergedProps} ref={ref} />
    </SegmentGroupProvider>
  )
})

SegmentGroupRoot.displayName = 'SegmentGroupRoot'
