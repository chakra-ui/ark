import { InjectionToken, inject } from '@angular/core'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import type { UseComboboxReturn } from './use-combobox'

export const ARK_COMBOBOX_CONTEXT = new InjectionToken<UseComboboxReturn>('ARK_COMBOBOX_CONTEXT')

export function injectArkComboboxContext(): UseComboboxReturn {
  return inject(ARK_COMBOBOX_CONTEXT)
}

export const ARK_COMBOBOX_CONTEXT_CARRIER = new InjectionToken<ArkContextCarrier<UseComboboxReturn>>(
  'ARK_COMBOBOX_CONTEXT_CARRIER',
)

export function injectArkComboboxContextCarrier(): ArkContextCarrier<UseComboboxReturn> {
  return inject(ARK_COMBOBOX_CONTEXT_CARRIER)
}
