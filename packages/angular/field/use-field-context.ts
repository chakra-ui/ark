import { InjectionToken, inject } from '@angular/core'
import type { UseFieldReturn } from './use-field'

export const ARK_FIELD_CONTEXT = new InjectionToken<UseFieldReturn>('ARK_FIELD_CONTEXT')

export function injectArkFieldContext(): UseFieldReturn {
  return inject(ARK_FIELD_CONTEXT)
}

export function injectArkFieldContextOptional(): UseFieldReturn | null {
  return inject(ARK_FIELD_CONTEXT, { optional: true })
}
