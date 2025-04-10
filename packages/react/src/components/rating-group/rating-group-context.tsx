import type { ReactNode } from 'react'
import { type UseRatingGroupContext, useRatingGroupContext } from './use-rating-group-context'

export interface RatingGroupContextProps {
  children: (context: UseRatingGroupContext) => ReactNode
}

export const RatingGroupContext = (props: RatingGroupContextProps) => props.children(useRatingGroupContext())
