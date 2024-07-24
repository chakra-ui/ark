import type { TimeUnit } from '@zag-js/time-picker'
import { createContext } from '../../utils'

export interface UseTimePickerColumnPropsContext {
  unit: TimeUnit
}
export const [TimePickerColumnPropsProvider, useTimePickerColumnPropsContext] =
  createContext<UseTimePickerColumnPropsContext>('TimePickerColumnPropsContext')
