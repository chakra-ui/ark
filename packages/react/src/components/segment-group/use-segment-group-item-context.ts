import type { ItemState } from '@zag-js/radio-group'
import { createContext } from '../../utils/create-context'

export interface UseSegmentGroupItemContext extends ItemState {}

export const [SegmentGroupItemProvider, useSegmentGroupItemContext] =
  createContext<UseSegmentGroupItemContext>({
    name: 'SegmentGroupItemContext',
    hookName: 'useSegmentGroupItemContext',
    providerName: '<SegmentGroupItemProvider />',
  })
