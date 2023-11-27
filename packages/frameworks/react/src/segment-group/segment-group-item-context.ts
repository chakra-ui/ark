import type { ItemProps } from '@zag-js/radio-group'
import { createContext } from '../create-context'

export interface SegmentGroupItemContext extends ItemProps {}

export const [SegmentGroupItemProvider, useSegmentGroupItemContext] =
  createContext<SegmentGroupItemContext>({
    name: 'SegmentGroupItemContext',
    hookName: 'useSegmentGroupItemContext',
    providerName: '<SegmentGroupItemProvider />',
  })
