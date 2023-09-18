import { Rating, type RatingProps } from './rating'
import { useRatingContext } from './rating-context'
import { RatingGroup as RatingGroupRoot, type RatingGroupProps } from './rating-group'
import { useRatingGroupContext } from './rating-group-context'
import { RatingGroupControl, type RatingGroupControlProps } from './rating-group-control'
import { RatingGroupLabel, type RatingGroupLabelProps } from './rating-group-label'
import { ratingGroupAnatomy } from './rating-group.anatomy'

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
  ratingGroupAnatomy,
  useRatingContext,
  useRatingGroupContext,
}

export type { RatingGroupControlProps, RatingGroupLabelProps, RatingGroupProps, RatingProps }
