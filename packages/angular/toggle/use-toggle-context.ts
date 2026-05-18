import { InjectionToken, inject } from '@angular/core'
import type { UseToggleReturn } from './use-toggle'

export const ARK_TOGGLE_CONTEXT = new InjectionToken<UseToggleReturn>('ARK_TOGGLE_CONTEXT')

export function injectArkToggleContext(): UseToggleReturn {
  return inject(ARK_TOGGLE_CONTEXT)
}
