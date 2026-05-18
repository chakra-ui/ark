import { InjectionToken, type Signal, inject } from '@angular/core'

/**
 * Internal DI token carrying a navigation menu item's value/disabled so descendant
 * trigger/content/link/item-indicator directives can apply Zag's per-item prop bags.
 * Not exported from the public-api.
 */
export interface ArkNavigationMenuItemContext {
  readonly value: Signal<string>
  readonly disabled: Signal<boolean | undefined>
}

export const ARK_NAVIGATION_MENU_ITEM_CONTEXT = new InjectionToken<ArkNavigationMenuItemContext>(
  'ARK_NAVIGATION_MENU_ITEM_CONTEXT',
)

export function injectArkNavigationMenuItemContext(): ArkNavigationMenuItemContext {
  return inject(ARK_NAVIGATION_MENU_ITEM_CONTEXT)
}
