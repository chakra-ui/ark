import { createContext } from '../../utils'
import type { UseAngleSliderReturn } from './use-angle-slider'

export interface UseAngleSliderContext extends UseAngleSliderReturn {}

export const [AngleSliderProvider, useAngleSliderContext] = createContext<UseAngleSliderContext>('AngleSliderContext')
