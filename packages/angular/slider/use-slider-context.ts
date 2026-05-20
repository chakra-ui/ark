import { InjectionToken, inject } from '@angular/core'
import type { UseSliderReturn } from './use-slider'

export const ARK_SLIDER_CONTEXT = new InjectionToken<UseSliderReturn>('ARK_SLIDER_CONTEXT')

export function injectArkSliderContext(): UseSliderReturn {
  return inject(ARK_SLIDER_CONTEXT)
}
