import type { connect } from '@zag-js/radio'
import { createContext } from '../createContext'

export type RadioContext = Parameters<ReturnType<typeof connect>['getItemProps']>[0]

export const [RadioProvider, useRadioContext] = createContext<RadioContext>({
  name: 'RadioContext',
  hookName: 'useRadioContext',
  providerName: '<RadioProvider />',
})
