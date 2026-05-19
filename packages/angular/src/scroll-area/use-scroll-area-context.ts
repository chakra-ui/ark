import { InjectionToken, inject } from '@angular/core'
import type { UseScrollAreaReturn } from './use-scroll-area'

export const ARK_SCROLL_AREA_CONTEXT = new InjectionToken<UseScrollAreaReturn>('ARK_SCROLL_AREA_CONTEXT')

export function injectArkScrollAreaContext(): UseScrollAreaReturn {
  return inject(ARK_SCROLL_AREA_CONTEXT)
}
