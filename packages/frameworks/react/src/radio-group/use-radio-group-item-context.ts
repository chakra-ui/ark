import type { ItemProps, ItemState } from '@zag-js/radio-group'
import { createContext } from '../create-context'

// TODO
export interface UseRadioGroupItemContext extends ItemProps, ItemState {}

export const [RadioGroupItemProvider, useRadioGroupItemContext] =
  createContext<UseRadioGroupItemContext>({
    name: 'RadioGroupItemContext',
    hookName: 'useRadioGroupItemContext',
    providerName: '<RadioGroupItemProvider />',
  })
