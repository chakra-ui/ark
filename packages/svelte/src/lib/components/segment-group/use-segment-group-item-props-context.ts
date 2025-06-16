import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { ItemProps } from '@zag-js/radio-group'

export interface UseSegmentGroupItemPropsContext extends Accessor<ItemProps> {}

export const [SegmentGroupItemPropsProvider, useSegmentGroupItemPropsContext] =
  createContext<UseSegmentGroupItemPropsContext>({
    name: 'SegmentGroupItemPropsContext',
    hookName: 'useSegmentGroupItemPropsContext',
    providerName: '<SegmentGroupItemPropsProvider />',
  })
