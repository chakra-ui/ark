import type { TimeUnit } from '@zag-js/time-picker'
import { createContext } from '../../utils/create-context'

export interface UseTimePickerColumnPropsContext {
  unit: TimeUnit
}

export const [TimePickerColumnPropsProvider, useTimePickerColumnPropsContext] =
  createContext<UseTimePickerColumnPropsContext>({
    hookName: 'useTimePickerColumnPropsContext',
    providerName: '<TimePickerColumnPropsProvider />',
  })
