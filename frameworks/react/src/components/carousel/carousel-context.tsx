import type { ReactNode } from 'react'
import { type UseCarouselContext, useCarouselContext } from './use-carousel-context'

export interface CarouselContextProps {
  children: (context: UseCarouselContext) => ReactNode
}

export const CarouselContext = (props: CarouselContextProps) => props.children(useCarouselContext())
