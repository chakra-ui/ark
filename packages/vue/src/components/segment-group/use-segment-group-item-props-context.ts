import type { ItemProps } from '@zag-js/radio-group'
import { createContext } from '../../utils/create-context.ts'

export interface UseSegmentGroupItemPropsContext extends ItemProps {}

export const [SegmentGroupItemPropsProvider, useSegmentGroupItemPropsContext] =
  createContext<UseSegmentGroupItemPropsContext>('SegmentGroupItemPropsContext')
