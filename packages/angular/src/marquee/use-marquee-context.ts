import { InjectionToken, inject } from '@angular/core'
import type { UseMarqueeReturn } from './use-marquee'

export const ARK_MARQUEE_CONTEXT = new InjectionToken<UseMarqueeReturn>('ARK_MARQUEE_CONTEXT')

export function injectArkMarqueeContext(): UseMarqueeReturn {
  return inject(ARK_MARQUEE_CONTEXT)
}
