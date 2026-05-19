import { InjectionToken, inject } from '@angular/core'
import type { UseTagsInputReturn } from './use-tags-input'

export const ARK_TAGS_INPUT_CONTEXT = new InjectionToken<UseTagsInputReturn>('ARK_TAGS_INPUT_CONTEXT')

export function injectArkTagsInputContext(): UseTagsInputReturn {
  return inject(ARK_TAGS_INPUT_CONTEXT)
}
