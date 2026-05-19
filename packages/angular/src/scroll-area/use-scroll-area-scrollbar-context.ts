import { InjectionToken, type Signal, inject } from '@angular/core'
import type { ScrollAreaScrollbarProps } from './scroll-area.types'

export interface UseScrollAreaScrollbarContext {
  readonly orientation: Signal<ScrollAreaScrollbarProps['orientation'] | undefined>
}

export const ARK_SCROLL_AREA_SCROLLBAR_CONTEXT = new InjectionToken<UseScrollAreaScrollbarContext>(
  'ARK_SCROLL_AREA_SCROLLBAR_CONTEXT',
)

export function injectArkScrollAreaScrollbarContext(): UseScrollAreaScrollbarContext {
  return inject(ARK_SCROLL_AREA_SCROLLBAR_CONTEXT)
}
