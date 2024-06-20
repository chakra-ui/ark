import { createContext } from '../../utils/create-context'
import type { UseTimePickerReturn } from './use-time-picker'

export interface UseTimePickerContext extends UseTimePickerReturn {}

export const [TimePickerProvider, useTimePickerContext] =
  createContext<UseTimePickerContext>('TimePickerContext')
