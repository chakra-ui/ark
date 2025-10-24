import type { ReactNode } from 'react'
import { type UseMarqueeContext, useMarqueeContext } from './use-marquee-context'

export interface MarqueeContextProps {
  children: (context: UseMarqueeContext) => ReactNode
}

export const MarqueeContext = (props: MarqueeContextProps) => props.children(useMarqueeContext())
