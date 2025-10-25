import type { JSX } from 'solid-js'
import { type UseMarqueeContext, useMarqueeContext } from './use-marquee-context'

export interface MarqueeContextProps {
  children: (context: UseMarqueeContext) => JSX.Element
}

export const MarqueeContext = (props: MarqueeContextProps) => props.children(useMarqueeContext())
