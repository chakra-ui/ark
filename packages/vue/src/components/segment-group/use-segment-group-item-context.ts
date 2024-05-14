import type { ItemState } from '@zag-js/radio-group'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils'

export interface UseSegmentGroupItemContext extends ComputedRef<ItemState> {}

export const [SegmentGroupItemProvider, useSegmentGroupItemContext] =
  createContext<UseSegmentGroupItemContext>('SegmentGroupItemContext')
