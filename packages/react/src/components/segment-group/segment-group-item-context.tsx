'use client'

import type { ReactNode } from 'react'
import { type UseSegmentGroupItemContext, useSegmentGroupItemContext } from './use-segment-group-item-context.ts'

export interface SegmentGroupItemContextProps {
  children: (context: UseSegmentGroupItemContext) => ReactNode
}

export const SegmentGroupItemContext = (props: SegmentGroupItemContextProps) =>
  props.children(useSegmentGroupItemContext())
