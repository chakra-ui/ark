import { createContext } from '../../utils'
import type { UseSegmentGroupReturn } from './use-segment-group'

export interface UseSegmentGroupContext extends UseSegmentGroupReturn {}

export const [SegmentGroupProvider, useSegmentGroupContext] =
  createContext<UseSegmentGroupContext>('SegmentGroupContext')
