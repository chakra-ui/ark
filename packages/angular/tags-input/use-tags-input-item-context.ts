import { InjectionToken, inject, type Signal } from '@angular/core'

export interface ArkTagsInputItemContext {
  index: Signal<number>
  value: Signal<string>
}

export const ARK_TAGS_INPUT_ITEM_CONTEXT = new InjectionToken<ArkTagsInputItemContext>('ARK_TAGS_INPUT_ITEM_CONTEXT')

export function injectArkTagsInputItemContext(): ArkTagsInputItemContext {
  const context = inject(ARK_TAGS_INPUT_ITEM_CONTEXT, { optional: true })
  if (!context) {
    throw new Error(
      'ARK_TAGS_INPUT_ITEM_CONTEXT not found: a tags-input item part directive must be used inside an [arkTagsInputItem] directive.',
    )
  }
  return context
}
