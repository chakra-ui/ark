'use client'

import { createContext } from '../../utils/create-context.ts'
import type { UseMarqueeReturn } from './use-marquee.ts'

export interface UseMarqueeContext extends UseMarqueeReturn {}

export const [MarqueeProvider, useMarqueeContext] = createContext<UseMarqueeContext>({
  name: 'MarqueeContext',
  hookName: 'useMarqueeContext',
  providerName: '<MarqueeProvider />',
})
