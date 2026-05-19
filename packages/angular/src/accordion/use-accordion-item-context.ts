import { InjectionToken, type Signal, inject } from '@angular/core'
import type * as accordion from '@zag-js/accordion'

export interface ArkAccordionItemContext {
  readonly value: Signal<string>
  readonly disabled: Signal<boolean | undefined>
  readonly state: Signal<accordion.ItemState>
}

export const ARK_ACCORDION_ITEM_CONTEXT = new InjectionToken<ArkAccordionItemContext>('ARK_ACCORDION_ITEM_CONTEXT')

export function injectArkAccordionItemContext(): ArkAccordionItemContext {
  return inject(ARK_ACCORDION_ITEM_CONTEXT)
}
