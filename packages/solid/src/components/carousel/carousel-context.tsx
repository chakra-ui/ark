import type { JSX } from 'solid-js'
import { type UseCarouselContext, useCarouselContext } from './use-carousel-context'

export interface CarouselContextProps {
  children: (context: UseCarouselContext) => JSX.Element
}

export const CarouselContext = (props: CarouselContextProps) => props.children(useCarouselContext())
