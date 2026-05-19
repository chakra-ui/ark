import { InjectionToken, inject } from '@angular/core'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import type { UseTabsReturn } from './use-tabs'

export const ARK_TABS_CONTEXT = new InjectionToken<UseTabsReturn>('ARK_TABS_CONTEXT')

export function injectArkTabsContext(): UseTabsReturn {
  return inject(ARK_TABS_CONTEXT)
}

export const ARK_TABS_CONTEXT_CARRIER = new InjectionToken<ArkContextCarrier<UseTabsReturn>>('ARK_TABS_CONTEXT_CARRIER')

export function injectArkTabsContextCarrier(): ArkContextCarrier<UseTabsReturn> {
  return inject(ARK_TABS_CONTEXT_CARRIER)
}
