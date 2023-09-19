import { Rating, type RatingProps } from './rating'
import { useRatingContext, type RatingContext } from './rating-context'
import { RatingGroup as RatingGroupRoot, type RatingGroupProps } from './rating-group'
import { useRatingGroupContext } from './rating-group-context'
import { RatingGroupControl, type RatingGroupControlProps } from './rating-group-control'
import { RatingGroupLabel, type RatingGroupLabelProps } from './rating-group-label'

const RatingGroup = Object.assign(RatingGroupRoot, {
  Root: RatingGroupRoot,
  Control: RatingGroupControl,
  Label: RatingGroupLabel,
  Rating: Rating,
})

export {
  Rating,
  RatingGroup,
  RatingGroupControl,
  RatingGroupLabel,
  useRatingContext,
  useRatingGroupContext,
}

export type {
  RatingContext,
  RatingGroupControlProps,
  RatingGroupLabelProps,
  RatingGroupProps,
  RatingProps,
}
