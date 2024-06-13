import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useRatingGroupContext } from './use-rating-group-context'

export type RatingGroupHiddenInputBaseProps = {}
export interface RatingGroupHiddenInputProps
  extends HTMLArkProps<'input'>,
    RatingGroupHiddenInputBaseProps {}

export const RatingGroupHiddenInput = forwardRef<HTMLInputElement, RatingGroupHiddenInputProps>(
  (props, ref) => {
    const ratingGroup = useRatingGroupContext()
    const mergedProps = mergeProps(ratingGroup.getHiddenInputProps(), props)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

RatingGroupHiddenInput.displayName = 'RatingGroupHiddenInput'
