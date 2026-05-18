import type { ItemState } from '@zag-js/radio-group'
import type { Accessor } from 'solid-js'
import { createContext } from '../../utils/create-context.ts'

export interface UseSegmentGroupItemContext extends Accessor<ItemState> {}

export const [SegmentGroupItemProvider, useSegmentGroupItemContext] = createContext<UseSegmentGroupItemContext>({
  hookName: 'useSegmentGroupItemContext',
  providerName: '<SegmentGroupItemProvider />',
})
