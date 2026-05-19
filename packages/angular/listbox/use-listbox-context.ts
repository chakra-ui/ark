import { InjectionToken, inject } from '@angular/core'
import type { CollectionItem } from '@zag-js/collection'
import type { UseListboxReturn } from './use-listbox'

export const ARK_LISTBOX_CONTEXT = new InjectionToken<UseListboxReturn<CollectionItem>>('ARK_LISTBOX_CONTEXT')

export function injectArkListboxContext<T extends CollectionItem = CollectionItem>(): UseListboxReturn<T> {
  return inject(ARK_LISTBOX_CONTEXT) as UseListboxReturn<T>
}
