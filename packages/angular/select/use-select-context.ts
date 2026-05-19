import { InjectionToken, inject } from '@angular/core'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import type { UseSelectReturn } from './use-select'

export const ARK_SELECT_CONTEXT = new InjectionToken<UseSelectReturn>('ARK_SELECT_CONTEXT')

export function injectArkSelectContext(): UseSelectReturn {
  return inject(ARK_SELECT_CONTEXT)
}

export const ARK_SELECT_CONTEXT_CARRIER = new InjectionToken<ArkContextCarrier<UseSelectReturn>>(
  'ARK_SELECT_CONTEXT_CARRIER',
)

export function injectArkSelectContextCarrier(): ArkContextCarrier<UseSelectReturn> {
  return inject(ARK_SELECT_CONTEXT_CARRIER)
}
