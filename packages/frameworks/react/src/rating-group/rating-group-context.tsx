import type { ReactNode } from 'react'
import { useRatingGroupContext, type UseRatingGroupContext } from './use-rating-group-context'

export interface RatingGroupContextProps {
  children: (context: UseRatingGroupContext) => ReactNode
}

export const RatingGroupContext = (props: RatingGroupContextProps) =>
  props.children(useRatingGroupContext())
