import { InjectionToken, type Signal, inject } from '@angular/core'
import type * as menu from '@zag-js/menu'

/**
 * Internal DI token carrying a menu item's own value/checked/api so descendant
 * indicators can apply Zag's `getItemIndicatorProps`. Not exported from the
 * public-api.
 *
 * When `checked` is `undefined`, the parent item is a non-option item and
 * indicator descendants should not render a checked/unchecked state.
 */
export interface ArkMenuItemContext {
  readonly value: Signal<string>
  readonly disabled: Signal<boolean | undefined>
  readonly valueText: Signal<string | undefined>
  readonly checked: Signal<boolean | undefined>
  readonly api: Signal<menu.Api>
}

export const ARK_MENU_ITEM_CONTEXT = new InjectionToken<ArkMenuItemContext>('ARK_MENU_ITEM_CONTEXT')

export function injectArkMenuItemContext(): ArkMenuItemContext {
  return inject(ARK_MENU_ITEM_CONTEXT)
}
