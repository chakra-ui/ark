import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useRatingGroupContext } from './use-rating-group-context'

export interface RatingGroupHiddenInputProps extends HTMLArkProps<'input'> {}

export const RatingGroupHiddenInput = forwardRef<HTMLInputElement, RatingGroupHiddenInputProps>(
  (props, ref) => {
    const ratingGroup = useRatingGroupContext()
    const mergedProps = mergeProps(ratingGroup.hiddenInputProps, props)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

RatingGroupHiddenInput.displayName = 'RatingGroupHiddenInput'
