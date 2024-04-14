import { createContext } from '../../utils/create-context'
import type { UseCarouselReturn } from './use-carousel'

export interface UseCarouselContext extends UseCarouselReturn {}

export const [CarouselProvider, useCarouselContext] = createContext<UseCarouselContext>({
  hookName: 'useCarouselContext',
  providerName: '<CarouselProvider />',
})
