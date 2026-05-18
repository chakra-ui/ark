import { InjectionToken, inject } from '@angular/core'
import type { UseFieldsetReturn } from './use-fieldset'

export const ARK_FIELDSET_CONTEXT = new InjectionToken<UseFieldsetReturn>('ARK_FIELDSET_CONTEXT')

export function injectArkFieldsetContext(): UseFieldsetReturn {
  return inject(ARK_FIELDSET_CONTEXT)
}

export function injectArkFieldsetContextOptional(): UseFieldsetReturn | null {
  return inject(ARK_FIELDSET_CONTEXT, { optional: true })
}
