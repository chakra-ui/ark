import { InjectionToken, inject } from '@angular/core'
import type { UseDateInputReturn } from './use-date-input'

export const ARK_DATE_INPUT_CONTEXT = new InjectionToken<UseDateInputReturn>('ARK_DATE_INPUT_CONTEXT')

export function injectArkDateInputContext(): UseDateInputReturn {
  return inject(ARK_DATE_INPUT_CONTEXT)
}
