import { createContext } from '../../utils/create-context'
import type { UseAngleSliderReturn } from './use-angle-slider'

export interface UseAngleSliderContext extends UseAngleSliderReturn {}

export const [AngleSliderProvider, useAngleSliderContext] = createContext<UseAngleSliderContext>({
  hookName: 'useAngleSliderContext',
  providerName: '<AngleSliderProvider />',
})
