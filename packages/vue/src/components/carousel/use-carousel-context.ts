import { createContext } from '../../utils/create-context.ts'
import type { UseCarouselReturn } from './use-carousel.ts'

export interface UseCarouselContext extends UseCarouselReturn {}

export const [CarouselProvider, useCarouselContext] = createContext<UseCarouselContext>('CarouselContext')
