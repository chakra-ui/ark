import { InjectionToken, inject } from '@angular/core'
import type { UseProgressReturn } from './use-progress'

export const ARK_PROGRESS_CONTEXT = new InjectionToken<UseProgressReturn>('ARK_PROGRESS_CONTEXT')

export function injectArkProgressContext(): UseProgressReturn {
  return inject(ARK_PROGRESS_CONTEXT)
}
