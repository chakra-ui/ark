import { InjectionToken, inject, type Signal } from '@angular/core'
import type { RadioGroupItemProps, RadioGroupItemState } from './radio-group.types'

export interface ArkRadioGroupItemContext {
  itemProps: () => RadioGroupItemProps
  itemState: Signal<RadioGroupItemState>
}

export const ARK_RADIO_GROUP_ITEM_CONTEXT = new InjectionToken<ArkRadioGroupItemContext>('ARK_RADIO_GROUP_ITEM_CONTEXT')

export function injectArkRadioGroupItemContext(): ArkRadioGroupItemContext {
  const context = inject(ARK_RADIO_GROUP_ITEM_CONTEXT, { optional: true })
  if (!context) {
    throw new Error(
      'ARK_RADIO_GROUP_ITEM_CONTEXT not found: a radio group item part directive must be used inside an [arkRadioGroupItem] directive.',
    )
  }
  return context
}
