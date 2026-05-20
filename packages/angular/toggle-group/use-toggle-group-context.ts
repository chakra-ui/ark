import { InjectionToken, inject } from '@angular/core'
import type { UseToggleGroupReturn } from './use-toggle-group'

export const ARK_TOGGLE_GROUP_CONTEXT = new InjectionToken<UseToggleGroupReturn>('ARK_TOGGLE_GROUP_CONTEXT')

export function injectArkToggleGroupContext(): UseToggleGroupReturn {
  return inject(ARK_TOGGLE_GROUP_CONTEXT)
}
