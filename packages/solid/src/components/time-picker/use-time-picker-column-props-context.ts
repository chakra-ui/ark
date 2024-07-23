import type { TimeUnit } from '@zag-js/time-picker'
import { createContext } from '../../utils/create-context'

export interface UseTimePickerColumnPropsColumnPropsContext {
  unit: TimeUnit
}

export const [TimePickerColumnPropsProvider, useTimePickerColumnPropsContext] =
  createContext<UseTimePickerColumnPropsColumnPropsContext>({
    hookName: 'useTimePickerColumnPropsContext',
    providerName: '<TimePickerColumnPropsProvider />',
  })
