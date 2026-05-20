import { InjectionToken, inject } from '@angular/core'
import type { UseCheckboxGroupReturn } from './use-checkbox-group'

export const ARK_CHECKBOX_GROUP_CONTEXT = new InjectionToken<UseCheckboxGroupReturn>('ARK_CHECKBOX_GROUP_CONTEXT')

export function injectArkCheckboxGroupContext(): UseCheckboxGroupReturn {
  return inject(ARK_CHECKBOX_GROUP_CONTEXT)
}

export function injectArkCheckboxGroupContextOptional(): UseCheckboxGroupReturn | null {
  return inject(ARK_CHECKBOX_GROUP_CONTEXT, { optional: true })
}
