import { InjectionToken, inject } from '@angular/core'
import type { UseNumberInputReturn } from './use-number-input'

export const ARK_NUMBER_INPUT_CONTEXT = new InjectionToken<UseNumberInputReturn>('ARK_NUMBER_INPUT_CONTEXT')

export function injectArkNumberInputContext(): UseNumberInputReturn {
  return inject(ARK_NUMBER_INPUT_CONTEXT)
}
