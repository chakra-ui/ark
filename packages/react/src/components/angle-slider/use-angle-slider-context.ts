'use client'

import { createContext } from '../../utils/create-context.ts'
import type { UseAngleSliderReturn } from './use-angle-slider.ts'

export interface UseAngleSliderContext extends UseAngleSliderReturn {}

export const [AngleSliderProvider, useAngleSliderContext] = createContext<UseAngleSliderContext>({
  name: 'AngleSliderContext',
  hookName: 'useAngleSliderContext',
  providerName: '<AngleSliderProvider />',
})
