import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../../factory'
import { useRatingGroupContext } from './use-rating-group-context'

export interface RatingGroupControlProps extends HTMLArkProps<'div'> {}

export const RatingGroupControl = forwardRef<HTMLDivElement, RatingGroupControlProps>(
  (props, ref) => {
    const ratingGroup = useRatingGroupContext()
    const mergedProps = mergeProps(ratingGroup.controlProps, props)

    return (
      <>
        <ark.div {...mergedProps} ref={ref} />
        <input {...ratingGroup.hiddenInputProps} />
      </>
    )
  },
)

RatingGroupControl.displayName = 'RatingGroupControl'
