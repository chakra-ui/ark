import { InjectionToken, inject } from '@angular/core'
import type { UseEditableReturn } from './use-editable'

export const ARK_EDITABLE_CONTEXT = new InjectionToken<UseEditableReturn>('ARK_EDITABLE_CONTEXT')

export function injectArkEditableContext(): UseEditableReturn {
  return inject(ARK_EDITABLE_CONTEXT)
}
