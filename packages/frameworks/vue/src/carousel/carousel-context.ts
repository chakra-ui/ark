import { createContext } from '../context'
import { type UseCarouselReturn } from './use-carousel'

export type CarouselContext = UseCarouselReturn

export const [CarouselProvider, useCarouselContext] =
  createContext<UseCarouselReturn>('CarouselContext')
