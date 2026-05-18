import { InjectionToken, inject } from '@angular/core'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import type { UseMenuReturn } from './use-menu'

export const ARK_MENU_CONTEXT = new InjectionToken<UseMenuReturn>('ARK_MENU_CONTEXT')

export function injectArkMenuContext(): UseMenuReturn {
  return inject(ARK_MENU_CONTEXT)
}

export const ARK_MENU_CONTEXT_CARRIER = new InjectionToken<ArkContextCarrier<UseMenuReturn>>('ARK_MENU_CONTEXT_CARRIER')

export function injectArkMenuContextCarrier(): ArkContextCarrier<UseMenuReturn> {
  return inject(ARK_MENU_CONTEXT_CARRIER)
}
