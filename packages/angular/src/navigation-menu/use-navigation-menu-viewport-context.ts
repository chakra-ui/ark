import { InjectionToken, type Signal, inject } from '@angular/core'
import type { NavigationMenuViewportProps } from './navigation-menu.types'

/**
 * Internal DI token carrying viewport positioner props so descendant viewport directives
 * can apply Zag's `getViewportProps` with the configured alignment. Not exported from
 * the public-api.
 */
export interface ArkNavigationMenuViewportContext {
  readonly align: Signal<NavigationMenuViewportProps['align']>
}

export const ARK_NAVIGATION_MENU_VIEWPORT_CONTEXT = new InjectionToken<ArkNavigationMenuViewportContext>(
  'ARK_NAVIGATION_MENU_VIEWPORT_CONTEXT',
)

export function injectArkNavigationMenuViewportContext(): ArkNavigationMenuViewportContext {
  return inject(ARK_NAVIGATION_MENU_VIEWPORT_CONTEXT)
}
