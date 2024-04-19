import type { ItemProps } from '@zag-js/radio-group'
import type { Ref } from 'vue'
import { createContext } from '../../utils'

export interface UseSegmentGroupItemPropsContext extends Ref<ItemProps> {}

export const [SegmentGroupItemPropsProvider, useSegmentGroupItemPropsContext] =
  createContext<UseSegmentGroupItemPropsContext>('SegmentGroupItemPropsContext')
