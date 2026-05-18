import { InjectionToken, inject } from '@angular/core'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import type { UseDrawerReturn } from './use-drawer'

export const ARK_DRAWER_CONTEXT = new InjectionToken<UseDrawerReturn>('ARK_DRAWER_CONTEXT')

export function injectArkDrawerContext(): UseDrawerReturn {
  return inject(ARK_DRAWER_CONTEXT)
}

export const ARK_DRAWER_CONTEXT_CARRIER = new InjectionToken<ArkContextCarrier<UseDrawerReturn>>(
  'ARK_DRAWER_CONTEXT_CARRIER',
)

export function injectArkDrawerContextCarrier(): ArkContextCarrier<UseDrawerReturn> {
  return inject(ARK_DRAWER_CONTEXT_CARRIER)
}
