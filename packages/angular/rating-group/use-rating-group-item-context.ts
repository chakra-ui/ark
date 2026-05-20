import { InjectionToken, inject, type Signal } from '@angular/core'
import type { RatingGroupItemProps, RatingGroupItemState } from './rating-group.types'

export type UseRatingGroupItemContext = Signal<RatingGroupItemState>
export type UseRatingGroupItemPropsContext = Signal<RatingGroupItemProps>

export const ARK_RATING_GROUP_ITEM_CONTEXT = new InjectionToken<UseRatingGroupItemContext>(
  'ARK_RATING_GROUP_ITEM_CONTEXT',
)
export const ARK_RATING_GROUP_ITEM_PROPS_CONTEXT = new InjectionToken<UseRatingGroupItemPropsContext>(
  'ARK_RATING_GROUP_ITEM_PROPS_CONTEXT',
)

export function injectArkRatingGroupItemContext(): UseRatingGroupItemContext {
  return inject(ARK_RATING_GROUP_ITEM_CONTEXT)
}

export function injectArkRatingGroupItemPropsContext(): UseRatingGroupItemPropsContext {
  return inject(ARK_RATING_GROUP_ITEM_PROPS_CONTEXT)
}
