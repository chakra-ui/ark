import { createContext } from '../../utils/create-context'
import type { UseMarqueeReturn } from './use-marquee'

export interface UseMarqueeContext extends UseMarqueeReturn {}

export const [MarqueeProvider, useMarqueeContext] = createContext<UseMarqueeContext>('MarqueeContext')
