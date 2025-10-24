import { createContext } from '../../utils/create-context'
import type { UseMarqueeReturn } from './use-marquee.svelte'

export interface UseMarqueeContext extends UseMarqueeReturn {}

export const [MarqueeProvider, useMarqueeContext] = createContext<UseMarqueeContext>({
  hookName: 'useMarqueeContext',
  providerName: '<MarqueeProvider />',
})
