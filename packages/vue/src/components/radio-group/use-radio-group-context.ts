import { createContext } from '../../utils/create-context.ts'
import type { UseRadioGroupReturn } from './use-radio-group.ts'

export interface UseRadioGroupContext extends UseRadioGroupReturn {}

export const [RadioGroupProvider, useRadioGroupContext] = createContext<UseRadioGroupContext>('RadioGroupContext')
