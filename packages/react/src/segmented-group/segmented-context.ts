import { type connect } from '@zag-js/radio-group'
import { createContext } from '../create-context'

export type SegmentedContext = Parameters<ReturnType<typeof connect>['getRadioProps']>[0]

export const [SegmentedProvider, useSegmentedContext] = createContext<SegmentedContext>({
  name: 'SegmentedContext',
  hookName: 'useSegmentedContext',
  providerName: '<SegmentedProvider />',
})
