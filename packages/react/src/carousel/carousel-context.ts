import { createContext } from '../create-context'
import type { UseCarouselReturn } from './use-carousel'

export type CarouselContext = UseCarouselReturn

export const [CarouselProvider, useCarouselContext] = createContext<CarouselContext>({
  name: 'CarouselContext',
  hookName: 'useCarouselContext',
  providerName: '<CarouselProvider />',
})
