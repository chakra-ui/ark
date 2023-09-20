import { createContext } from '../context'
import type { UseRadioGroupReturn } from './use-radio-group'

export type RadioGroupContext = UseRadioGroupReturn

export const [RadioGroupProvider, useRadioGroupContext] =
  createContext<RadioGroupContext>('RadioGroupContext')
