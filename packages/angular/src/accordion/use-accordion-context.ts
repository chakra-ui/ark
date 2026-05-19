import { InjectionToken, inject } from '@angular/core'
import type { UseAccordionReturn } from './use-accordion'

export const ARK_ACCORDION_CONTEXT = new InjectionToken<UseAccordionReturn>('ARK_ACCORDION_CONTEXT')

export function injectArkAccordionContext(): UseAccordionReturn {
  return inject(ARK_ACCORDION_CONTEXT)
}
