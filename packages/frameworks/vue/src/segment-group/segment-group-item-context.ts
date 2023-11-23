import type { ItemProps } from '@zag-js/radio-group'
import type { ComputedRef } from 'vue'
import { createContext } from '../context'

export interface SegmentGroupItemContext extends ComputedRef<ItemProps> {}

export const [SegmentGroupItemProvider, useSegmentGroupItemContext] =
  createContext<SegmentGroupItemContext>('SegmentGroupItemContext')
