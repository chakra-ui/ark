import type {
  HoverChangeDetails as RatingGroupHoverChangeDetails,
  ValueChangeDetails as RatingGroupValueChangeDetails,
} from '@zag-js/rating-group'
import { RatingGroupRoot, type RatingGroupRootProps } from './rating-group'
import { useRatingGroupContext, type RatingGroupContext } from './rating-group-context'
import { RatingGroupControl, type RatingGroupControlProps } from './rating-group-control'
import { RatingGroupItem, type RatingGroupItemProps } from './rating-group-item'
import { useRatingGroupItemContext, type RatingGroupItemContext } from './rating-group-item-context'
import { RatingGroupLabel, type RatingGroupLabelProps } from './rating-group-label'

export const RatingGroup = {
  Root: RatingGroupRoot,
  Control: RatingGroupControl,
  Label: RatingGroupLabel,
  Item: RatingGroupItem,
}

export {
  RatingGroupControl,
  RatingGroupItem,
  RatingGroupLabel,
  RatingGroupRoot,
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
  RatingGroupRootProps,
  RatingGroupValueChangeDetails,
}
