import { InjectionToken, inject } from '@angular/core'
import type { UseRadioGroupReturn } from './use-radio-group'

export const ARK_RADIO_GROUP_CONTEXT = new InjectionToken<UseRadioGroupReturn>('ARK_RADIO_GROUP_CONTEXT')

export function injectArkRadioGroupContext(): UseRadioGroupReturn {
  return inject(ARK_RADIO_GROUP_CONTEXT)
}
