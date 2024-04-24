import { createContext } from '../../utils'
import type { UseCarouselReturn } from './use-carousel'

export interface UseCarouselContext extends UseCarouselReturn {}

export const [CarouselProvider, useCarouselContext] =
  createContext<UseCarouselContext>('CarouselContext')
