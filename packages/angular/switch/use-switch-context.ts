import { InjectionToken, inject } from '@angular/core'
import type { UseSwitchReturn } from './use-switch'

export const ARK_SWITCH_CONTEXT = new InjectionToken<UseSwitchReturn>('ARK_SWITCH_CONTEXT')

export function injectArkSwitchContext(): UseSwitchReturn {
  return inject(ARK_SWITCH_CONTEXT)
}
