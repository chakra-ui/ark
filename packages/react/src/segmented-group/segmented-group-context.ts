import { createContext } from '../create-context'
import { type UseSegmentedGroupReturn } from './use-segmented-group'

export type SegmentedGroupContext = UseSegmentedGroupReturn

export const [SegmentedGroupProvider, useSegmentedGroupContext] =
  createContext<SegmentedGroupContext>({
    name: 'SegmentedGroupContext',
    hookName: 'useSegmentedGroupContext',
    providerName: '<SegmentedGroupProvider />',
  })
