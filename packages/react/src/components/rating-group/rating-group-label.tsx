import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useRatingGroupContext } from './use-rating-group-context'

export type RatingGroupLabelBaseProps = {}
export interface RatingGroupLabelProps extends HTMLArkProps<'label'>, RatingGroupLabelBaseProps {}

export const RatingGroupLabel = forwardRef<HTMLLabelElement, RatingGroupLabelProps>(
  (props, ref) => {
    const ratingGroup = useRatingGroupContext()
    const mergedProps = mergeProps(ratingGroup.getLabelProps(), props)

    return <ark.label {...mergedProps} ref={ref} />
  },
)

RatingGroupLabel.displayName = 'RatingGroupLabel'
