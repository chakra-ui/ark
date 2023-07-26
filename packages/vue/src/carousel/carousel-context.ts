import { type connect } from '@zag-js/carousel'
import { type ComputedRef, type UnwrapRef } from 'vue'
import { createContext } from '../context'
import { type UseCarouselReturn } from './use-carousel'

export const [CarouselProvider, useCarouselContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('CarouselContext')

export type CarouselContext = UnwrapRef<UseCarouselReturn>
