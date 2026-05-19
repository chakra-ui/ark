import { InjectionToken, inject } from '@angular/core'
import type { UseSplitterReturn } from './use-splitter'

export const ARK_SPLITTER_CONTEXT = new InjectionToken<UseSplitterReturn>('ARK_SPLITTER_CONTEXT')

export function injectArkSplitterContext(): UseSplitterReturn {
  return inject(ARK_SPLITTER_CONTEXT)
}
