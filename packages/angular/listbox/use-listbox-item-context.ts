import { InjectionToken, inject, type Signal } from '@angular/core'
import type { CollectionItem } from '@zag-js/collection'

export interface ArkListboxItemContext<T extends CollectionItem = CollectionItem> {
  item: Signal<T>
  highlightOnHover: Signal<boolean | undefined>
}

export const ARK_LISTBOX_ITEM_CONTEXT = new InjectionToken<ArkListboxItemContext>('ARK_LISTBOX_ITEM_CONTEXT')

export function injectArkListboxItemContext<T extends CollectionItem = CollectionItem>(): ArkListboxItemContext<T> {
  const context = inject(ARK_LISTBOX_ITEM_CONTEXT, { optional: true })
  if (!context) {
    throw new Error(
      'ARK_LISTBOX_ITEM_CONTEXT not found: a listbox item part directive must be used inside an [arkListboxItem] directive.',
    )
  }
  return context as ArkListboxItemContext<T>
}
