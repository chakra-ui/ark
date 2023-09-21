import { createContext } from '../create-context'
import { type UseCarouselReturn } from './use-carousel'

export interface CarouselContext extends UseCarouselReturn {}

export const [CarouselProvider, useCarouselContext] = createContext<CarouselContext>({
  name: 'CarouselContext',
  hookName: 'useCarouselContext',
  providerName: '<CarouselProvider />',
})
