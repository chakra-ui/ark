import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useRatingGroupContext } from './use-rating-group-context'

export interface RatingGroupControlBaseProps extends PolymorphicProps {}
export interface RatingGroupControlProps extends HTMLProps<'div'>, RatingGroupControlBaseProps {}

export const RatingGroupControl = forwardRef<HTMLDivElement, RatingGroupControlProps>(
  (props, ref) => {
    const ratingGroup = useRatingGroupContext()
    const mergedProps = mergeProps(ratingGroup.getControlProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

RatingGroupControl.displayName = 'RatingGroupControl'
