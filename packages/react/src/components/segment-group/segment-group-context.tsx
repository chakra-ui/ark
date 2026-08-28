'use client'

import type { ReactNode } from 'react'
import { type UseSegmentGroupContext, useSegmentGroupContext } from './use-segment-group-context.ts'

export interface SegmentGroupContextProps {
  children: (context: UseSegmentGroupContext) => ReactNode
}

export const SegmentGroupContext = (props: SegmentGroupContextProps) => props.children(useSegmentGroupContext())
