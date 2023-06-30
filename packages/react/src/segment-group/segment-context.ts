import { type connect } from '@zag-js/radio-group'
import { createContext } from '../create-context'

export type SegmentContext = Parameters<ReturnType<typeof connect>['getRadioProps']>[0]

export const [SegmentProvider, useSegmentContext] = createContext<SegmentContext>({
  name: 'SegmentContext',
  hookName: 'useSegmentContext',
  providerName: '<SegmentProvider />',
})
