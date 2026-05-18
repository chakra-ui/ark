import { InjectionToken, inject } from '@angular/core'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import type { UseNavigationMenuReturn } from './use-navigation-menu'

export const ARK_NAVIGATION_MENU_CONTEXT = new InjectionToken<UseNavigationMenuReturn>('ARK_NAVIGATION_MENU_CONTEXT')

export function injectArkNavigationMenuContext(): UseNavigationMenuReturn {
  return inject(ARK_NAVIGATION_MENU_CONTEXT)
}

export const ARK_NAVIGATION_MENU_CONTEXT_CARRIER = new InjectionToken<ArkContextCarrier<UseNavigationMenuReturn>>(
  'ARK_NAVIGATION_MENU_CONTEXT_CARRIER',
)

export function injectArkNavigationMenuContextCarrier(): ArkContextCarrier<UseNavigationMenuReturn> {
  return inject(ARK_NAVIGATION_MENU_CONTEXT_CARRIER)
}
