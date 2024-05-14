import type { ItemState } from '@zag-js/radio-group'
import { createContext } from '../../utils/create-context'

export interface UseRadioGroupItemContext extends ItemState {}

export const [RadioGroupItemProvider, useRadioGroupItemContext] =
  createContext<UseRadioGroupItemContext>({
    name: 'RadioGroupItemContext',
    hookName: 'useRadioGroupItemContext',
    providerName: '<RadioGroupItemProvider />',
  })
