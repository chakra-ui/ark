import type { JSX } from '@solidjs/web'
import { type UseRatingGroupItemContext, useRatingGroupItemContext } from './use-rating-group-item-context.ts'

export interface RatingGroupItemContextProps {
  children: (context: UseRatingGroupItemContext) => JSX.Element
}

export const RatingGroupItemContext = (props: RatingGroupItemContextProps) =>
  props.children(useRatingGroupItemContext())
