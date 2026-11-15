import type { JSX } from '@solidjs/web'
import { type UseRatingGroupContext, useRatingGroupContext } from './use-rating-group-context.ts'

export interface RatingGroupContextProps {
  children: (context: UseRatingGroupContext) => JSX.Element
}

export const RatingGroupContext = (props: RatingGroupContextProps) => props.children(useRatingGroupContext())
