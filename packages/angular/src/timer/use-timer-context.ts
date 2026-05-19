import { InjectionToken, inject } from '@angular/core'
import type { UseTimerReturn } from './use-timer'

export const ARK_TIMER_CONTEXT = new InjectionToken<UseTimerReturn>('ARK_TIMER_CONTEXT')

export function injectArkTimerContext(): UseTimerReturn {
  return inject(ARK_TIMER_CONTEXT)
}
