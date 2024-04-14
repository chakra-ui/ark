import { createContext } from '../../utils/context'
import type { UseRadioGroupReturn } from './use-radio-group'

export interface RadioGroupContext extends UseRadioGroupReturn {}

export const [RadioGroupProvider, useRadioGroupContext] =
  createContext<RadioGroupContext>('RadioGroupContext')
