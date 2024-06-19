import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useRatingGroupContext } from './use-rating-group-context'

export interface RatingGroupHiddenInputBaseProps extends PolymorphicProps {}
export interface RatingGroupHiddenInputProps
  extends HTMLProps<'input'>,
    RatingGroupHiddenInputBaseProps {}

export const RatingGroupHiddenInput = forwardRef<HTMLInputElement, RatingGroupHiddenInputProps>(
  (props, ref) => {
    const ratingGroup = useRatingGroupContext()
    const mergedProps = mergeProps(ratingGroup.getHiddenInputProps(), props)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

RatingGroupHiddenInput.displayName = 'RatingGroupHiddenInput'
