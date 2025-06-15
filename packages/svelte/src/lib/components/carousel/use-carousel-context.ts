import { getContext } from 'svelte'
import type { UseCarouselReturn } from './use-carousel.svelte'

export interface UseCarouselContext extends UseCarouselReturn {}

export const useCarouselContext = (): UseCarouselContext => {
  return getContext('carousel')
}
