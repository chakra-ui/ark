import type { ItemProps, ItemState } from '@zag-js/radio-group'
import type { Accessor } from 'solid-js'
import { createContext } from '../create-context'

export interface UseSegmentGroupItemContext extends Accessor<ItemState> {}

export const [SegmentGroupItemProvider, useSegmentGroupItemContext] =
  createContext<UseSegmentGroupItemContext>({
    hookName: 'useSegmentGroupItemContext',
    providerName: '<SegmentGroupItemProvider />',
  })

export const [SegmentGroupItemPropsProvider, useSegmentGroupItemPropsContext] =
  createContext<ItemProps>({
    hookName: 'useSegmentGroupItemPropsContext',
    providerName: '<SegmentGroupItemPropsProvider />',
  })
