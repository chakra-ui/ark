import { InjectionToken, inject } from '@angular/core'
import type { UseStepsReturn } from './use-steps'

export const ARK_STEPS_CONTEXT = new InjectionToken<UseStepsReturn>('ARK_STEPS_CONTEXT')

export function injectArkStepsContext(): UseStepsReturn {
  return inject(ARK_STEPS_CONTEXT)
}
