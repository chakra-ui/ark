import { InjectionToken, inject, type Signal } from '@angular/core'
import type { CollectionItem } from '@zag-js/collection'

export interface ArkSelectItemContext<T extends CollectionItem = CollectionItem> {
  item: Signal<T>
  persistFocus: Signal<boolean | undefined>
}

export const ARK_SELECT_ITEM_CONTEXT = new InjectionToken<ArkSelectItemContext>('ARK_SELECT_ITEM_CONTEXT')

export function injectArkSelectItemContext<T extends CollectionItem = CollectionItem>(): ArkSelectItemContext<T> {
  const context = inject(ARK_SELECT_ITEM_CONTEXT, { optional: true })
  if (!context) {
    throw new Error(
      'ARK_SELECT_ITEM_CONTEXT not found: a select item part directive must be used inside an [arkSelectItem] directive.',
    )
  }
  return context as ArkSelectItemContext<T>
}
