import { createContext } from '../../utils/create-context.ts'
import type { UseMarqueeReturn } from './use-marquee.svelte.ts'

export interface UseMarqueeContext extends UseMarqueeReturn {}

export const [MarqueeProvider, useMarqueeContext] = createContext<UseMarqueeContext>({
  hookName: 'useMarqueeContext',
  providerName: '<MarqueeProvider />',
})
