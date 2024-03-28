import type { JSX } from 'solid-js'
import {
  useRatingGroupItemContext,
  type UseRatingGroupItemContext,
} from './use-rating-group-item-context'

export interface RatingGroupItemContextProps {
  children: (context: UseRatingGroupItemContext) => JSX.Element
}

export const RatingGroupItemContext = (props: RatingGroupItemContextProps) =>
  props.children(useRatingGroupItemContext())
