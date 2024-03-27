import type { JSX } from 'solid-js'
import { useCarouselContext, type UseCarouselContext } from './use-carousel-context'

export interface CarouselContextProps {
  children: (context: UseCarouselContext) => JSX.Element
}

export const CarouselContext = (props: CarouselContextProps) => props.children(useCarouselContext())
