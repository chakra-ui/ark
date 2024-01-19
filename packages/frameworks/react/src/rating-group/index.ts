import type {
  HoverChangeDetails as RatingGroupHoverChangeDetails,
  ValueChangeDetails as RatingGroupValueChangeDetails,
} from '@zag-js/rating-group'
import { RatingGroup as RatingGroupRoot, type RatingGroupProps } from './rating-group'
import { useRatingGroupContext, type RatingGroupContext } from './rating-group-context'
import { RatingGroupControl, type RatingGroupControlProps } from './rating-group-control'
import { RatingGroupItem, type RatingGroupItemProps } from './rating-group-item'
import { useRatingGroupItemContext, type RatingGroupItemContext } from './rating-group-item-context'
import { RatingGroupLabel, type RatingGroupLabelProps } from './rating-group-label'

const RatingGroup = Object.assign(RatingGroupRoot, {
  Root: RatingGroupRoot,
  Control: RatingGroupControl,
  Label: RatingGroupLabel,
  Item: RatingGroupItem,
})

export {
  RatingGroup,
  RatingGroupControl,
  RatingGroupItem,
  RatingGroupLabel,
  useRatingGroupContext,
  useRatingGroupItemContext,
}

export type {
  RatingGroupContext,
  RatingGroupControlProps,
  RatingGroupHoverChangeDetails,
  RatingGroupItemContext,
  RatingGroupItemProps,
  RatingGroupLabelProps,
  RatingGroupProps,
  RatingGroupValueChangeDetails,
}
