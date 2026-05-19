import { InjectionToken, inject, type Signal } from '@angular/core'
import type { CollectionItem } from '@zag-js/collection'

export interface ArkComboboxItemContext<T extends CollectionItem = CollectionItem> {
  item: Signal<T>
  persistFocus: Signal<boolean | undefined>
}

export const ARK_COMBOBOX_ITEM_CONTEXT = new InjectionToken<ArkComboboxItemContext>('ARK_COMBOBOX_ITEM_CONTEXT')

export function injectArkComboboxItemContext<T extends CollectionItem = CollectionItem>(): ArkComboboxItemContext<T> {
  const context = inject(ARK_COMBOBOX_ITEM_CONTEXT, { optional: true })
  if (!context) {
    throw new Error(
      'ARK_COMBOBOX_ITEM_CONTEXT not found: a combobox item part directive must be used inside an [arkComboboxItem] directive.',
    )
  }
  return context as ArkComboboxItemContext<T>
}
