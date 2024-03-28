import type { ReactNode } from 'react'
import {
  useRatingGroupItemContext,
  type UseRatingGroupItemContext,
} from './use-rating-group-item-context'

export interface RatingGroupItemContextProps {
  children: (context: UseRatingGroupItemContext) => ReactNode
}

export const RatingGroupItemContext = (props: RatingGroupItemContextProps) =>
  props.children(useRatingGroupItemContext())
