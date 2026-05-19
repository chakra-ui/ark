import { InjectionToken, inject } from '@angular/core'
import type { UseCarouselReturn } from './use-carousel'

export const ARK_CAROUSEL_CONTEXT = new InjectionToken<UseCarouselReturn>('ARK_CAROUSEL_CONTEXT')

export function injectArkCarouselContext(): UseCarouselReturn {
  return inject(ARK_CAROUSEL_CONTEXT)
}
