import { createContext } from '../../utils'
import type { UseRadioGroupReturn } from './use-radio-group'

export interface RadioGroupContext extends UseRadioGroupReturn {}

export const [RadioGroupProvider, useRadioGroupContext] =
  createContext<RadioGroupContext>('RadioGroupContext')
