import { InjectionToken, inject } from '@angular/core'
import type { UseRatingGroupReturn } from './use-rating-group'

export const ARK_RATING_GROUP_CONTEXT = new InjectionToken<UseRatingGroupReturn>('ARK_RATING_GROUP_CONTEXT')

export function injectArkRatingGroupContext(): UseRatingGroupReturn {
  return inject(ARK_RATING_GROUP_CONTEXT)
}
