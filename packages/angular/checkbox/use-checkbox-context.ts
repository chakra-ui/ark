import { InjectionToken, inject } from '@angular/core'
import type { UseCheckboxReturn } from './use-checkbox'

export const ARK_CHECKBOX_CONTEXT = new InjectionToken<UseCheckboxReturn>('ARK_CHECKBOX_CONTEXT')

export function injectArkCheckboxContext(): UseCheckboxReturn {
  return inject(ARK_CHECKBOX_CONTEXT)
}
