import { createContext } from '../../utils/create-context.ts'
import type { UseTourReturn } from './use-tour.ts'

export interface UseTourContext extends UseTourReturn {}

export const [TourProvider, useTourContext] = createContext<UseTourContext>('TourContext')
