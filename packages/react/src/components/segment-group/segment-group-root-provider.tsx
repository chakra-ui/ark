'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseSegmentGroupReturn } from './use-segment-group.ts'
import { SegmentGroupProvider } from './use-segment-group-context.ts'
import type { RootState } from '@zag-js/radio-group'

interface RootProviderProps {
  value: UseSegmentGroupReturn
}

export interface SegmentGroupRootProviderState extends RootState {}

export interface SegmentGroupRootProviderBaseProps
  extends RootProviderProps, PolymorphicProps<SegmentGroupRootProviderState> {}
export interface SegmentGroupRootProviderProps extends HTMLProps<'div'>, SegmentGroupRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const SegmentGroupRootProvider = forwardRef<HTMLDivElement, SegmentGroupRootProviderProps>((props, ref) => {
  const [{ value: segmentGroup }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(segmentGroup.getRootProps(), localProps)

  return (
    <SegmentGroupProvider value={segmentGroup}>
      <ark.div {...mergedProps} ref={ref} state={segmentGroup.getRootState()} />
    </SegmentGroupProvider>
  )
})

SegmentGroupRootProvider.displayName = 'SegmentGroupRootProvider'
