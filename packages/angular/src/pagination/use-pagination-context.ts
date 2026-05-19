import { InjectionToken, inject } from '@angular/core'
import type { UsePaginationReturn } from './use-pagination'

export const ARK_PAGINATION_CONTEXT = new InjectionToken<UsePaginationReturn>('ARK_PAGINATION_CONTEXT')

export function injectArkPaginationContext(): UsePaginationReturn {
  return inject(ARK_PAGINATION_CONTEXT)
}
