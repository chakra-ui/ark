import { createContext } from '../../utils/context'
import type { UseCarouselReturn } from './use-carousel'

export interface CarouselContext extends UseCarouselReturn {}

export const [CarouselProvider, useCarouselContext] =
  createContext<UseCarouselReturn>('CarouselContext')
