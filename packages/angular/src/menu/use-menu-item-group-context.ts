import { InjectionToken, type Signal, inject } from '@angular/core'

/**
 * Internal DI token carrying a non-radio item-group's id so the corresponding
 * `arkMenuItemGroupLabel` can apply Zag's `getItemGroupLabelProps`.
 */
export interface ArkMenuItemGroupContext {
  readonly id: Signal<string>
}

export const ARK_MENU_ITEM_GROUP_CONTEXT = new InjectionToken<ArkMenuItemGroupContext>('ARK_MENU_ITEM_GROUP_CONTEXT')

export function injectArkMenuItemGroupContext(): ArkMenuItemGroupContext {
  return inject(ARK_MENU_ITEM_GROUP_CONTEXT)
}
