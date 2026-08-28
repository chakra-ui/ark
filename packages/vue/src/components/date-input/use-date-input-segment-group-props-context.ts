import type { ComputedRef } from 'vue'
import { createContext } from '../../utils/create-context.ts'
import type { SegmentGroupProps } from '@zag-js/date-input'

export const [DateInputSegmentGroupPropsProvider, useDateInputSegmentGroupPropsContext] = createContext<
  ComputedRef<SegmentGroupProps>
>('DateInputSegmentGroupPropsContext')
