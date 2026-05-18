import { InjectionToken, type Signal, inject } from '@angular/core'

/**
 * Internal DI token carrying a radio item-group's id and current selected value
 * so radio items inside the group can mark themselves checked and emit
 * value-change events through the parent group's model channel.
 */
export interface ArkMenuRadioItemGroupContext {
  readonly id: Signal<string>
  readonly value: Signal<string | null | undefined>
  setValue(next: string): void
}

export const ARK_MENU_RADIO_ITEM_GROUP_CONTEXT = new InjectionToken<ArkMenuRadioItemGroupContext>(
  'ARK_MENU_RADIO_ITEM_GROUP_CONTEXT',
)

export function injectArkMenuRadioItemGroupContext(): ArkMenuRadioItemGroupContext {
  return inject(ARK_MENU_RADIO_ITEM_GROUP_CONTEXT)
}
