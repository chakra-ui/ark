import type { ReactNode } from 'react'
import { useCarouselContext, type UseCarouselContext } from './use-carousel-context'

export interface CarouselContextProps {
  children: (context: UseCarouselContext) => ReactNode
}

export const CarouselContext = (props: CarouselContextProps) => props.children(useCarouselContext())
