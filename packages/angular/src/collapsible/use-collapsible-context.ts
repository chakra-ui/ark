import { InjectionToken, inject } from '@angular/core'
import type { UseCollapsibleReturn } from './use-collapsible'

export const ARK_COLLAPSIBLE_CONTEXT = new InjectionToken<UseCollapsibleReturn>('ARK_COLLAPSIBLE_CONTEXT')

export function injectArkCollapsibleContext(): UseCollapsibleReturn {
  return inject(ARK_COLLAPSIBLE_CONTEXT)
}
