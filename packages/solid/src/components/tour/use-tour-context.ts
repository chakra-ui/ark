import { createContext } from '../../utils/create-context'
import type { UseTourReturn } from './use-tour'

export interface UseTourContext extends UseTourReturn {}

export const [TourProvider, useTourContext] = createContext<UseTourContext>({
  hookName: 'useTourContext',
  providerName: '<TourProvider />',
})
