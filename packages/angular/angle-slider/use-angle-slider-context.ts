import { InjectionToken, inject } from '@angular/core'
import type { UseAngleSliderReturn } from './use-angle-slider'

export const ARK_ANGLE_SLIDER_CONTEXT = new InjectionToken<UseAngleSliderReturn>('ARK_ANGLE_SLIDER_CONTEXT')

export function injectArkAngleSliderContext(): UseAngleSliderReturn {
  return inject(ARK_ANGLE_SLIDER_CONTEXT)
}
