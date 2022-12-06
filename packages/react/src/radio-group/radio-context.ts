import type { connect } from '@zag-js/radio'
import { createContext } from '../create-context'

export type RadioContext = Parameters<ReturnType<typeof connect>['getItemProps']>[0]

export const [RadioProvider, useRadioContext] = createContext<RadioContext>({
  name: 'RadioContext',
  hookName: 'useRadioContext',
  providerName: '<RadioProvider />',
})
