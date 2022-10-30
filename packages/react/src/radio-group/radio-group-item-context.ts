import type { connect } from '@zag-js/radio'
import { createContext } from '../createContext'

export type RadioGroupItemContext = Parameters<ReturnType<typeof connect>['getItemProps']>[0]

export const [RadioGroupItemProvider, useRadioGroupItemContext] =
  createContext<RadioGroupItemContext>({
    name: 'RadioGroupItemContext',
    hookName: 'useRadioGroupItemContext',
    providerName: '<RadioGroupItemProvider />',
  })
