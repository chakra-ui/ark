import { createContext } from '../create-context'
import { type UseSegmentGroupReturn } from './use-segment-group'

export type SegmentGroupContext = UseSegmentGroupReturn

export const [SegmentGroupProvider, useSegmentGroupContext] = createContext<SegmentGroupContext>({
  hookName: 'useSegmentGroupContext',
  providerName: '<SegmentGroupProvider />',
})
