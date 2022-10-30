import { createContext } from '../createContext'
import { connect } from '@zag-js/radio'

export type RadioGroupItemContext = Parameters<ReturnType<typeof connect>['getItemProps']>[0]

export const [RadioGroupItemProvider, useRadioGroupItemContext] =
  createContext<RadioGroupItemContext>({
    name: 'RadioGroupItemContext',
    hookName: 'useRadioGroupItemContext',
    providerName: '<RadioGroupItemProvider />',
  })
