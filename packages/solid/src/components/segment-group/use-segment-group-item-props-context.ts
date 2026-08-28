import type { ItemProps } from '@zag-js/radio-group'
import { createContext } from '../../utils/create-context.ts'

export const [SegmentGroupItemPropsProvider, useSegmentGroupItemPropsContext] = createContext<ItemProps>({
  hookName: 'useSegmentGroupItemPropsContext',
  providerName: '<SegmentGroupItemPropsProvider />',
})
