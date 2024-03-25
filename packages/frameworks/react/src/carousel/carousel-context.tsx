import { useCarouselContext, type UseCarouselContext } from './use-carousel-context'

export interface CarouselContextProps {
  children: (context: UseCarouselContext) => React.ReactNode
}

export const CarouselContext = (props: CarouselContextProps) => props.children(useCarouselContext())
