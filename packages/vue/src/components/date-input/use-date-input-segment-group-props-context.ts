import type { ComputedRef } from 'vue'
import { createContext } from '../../utils/create-context'
import type { SegmentGroupProps } from '@zag-js/date-input'

export const [DateInputSegmentGroupPropsProvider, useDateInputSegmentGroupPropsContext] = createContext<
  ComputedRef<SegmentGroupProps>
>('DateInputSegmentGroupPropsContext')
