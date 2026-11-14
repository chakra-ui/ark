import type { JSX } from '@solidjs/web'
import { type UseMarqueeContext, useMarqueeContext } from './use-marquee-context.ts'

export interface MarqueeContextProps {
  children: (context: UseMarqueeContext) => JSX.Element
}

export const MarqueeContext = (props: MarqueeContextProps) => props.children(useMarqueeContext())
