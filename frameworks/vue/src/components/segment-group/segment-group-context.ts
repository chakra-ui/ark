import { createContext } from '../../utils/context'
import type { UseSegmentGroupReturn } from './use-segment-group'

export interface SegmentGroupContext extends UseSegmentGroupReturn {}

export const [SegmentGroupProvider, useSegmentGroupContext] =
  createContext<SegmentGroupContext>('SegmentGroupContext')
