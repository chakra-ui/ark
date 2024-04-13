import type { JSX } from 'solid-js'
import { type UseRatingGroupContext, useRatingGroupContext } from './use-rating-group-context'

export interface RatingGroupContextProps {
  children: (context: UseRatingGroupContext) => JSX.Element
}

export const RatingGroupContext = (props: RatingGroupContextProps) =>
  props.children(useRatingGroupContext())
