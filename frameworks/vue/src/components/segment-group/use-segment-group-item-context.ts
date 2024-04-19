import type { ItemProps } from '@zag-js/radio-group'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils'

export interface UseSegmentGroupItemContext extends ComputedRef<ItemProps> {}

export const [SegmentGroupItemProvider, useSegmentGroupItemContext] =
  createContext<UseSegmentGroupItemContext>('SegmentGroupItemContext')
