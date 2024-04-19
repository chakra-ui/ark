import { createContext } from '../../utils'
import type { UseRadioGroupReturn } from './use-radio-group'

export interface UseRadioGroupContext extends UseRadioGroupReturn {}

export const [RadioGroupProvider, useRadioGroupContext] =
  createContext<UseRadioGroupContext>('RadioGroupContext')
