import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useRatingGroupContext } from './use-rating-group-context'

export interface RatingGroupHiddenInputBaseProps extends PolymorphicProps<'input'> {}
export interface RatingGroupHiddenInputProps
  extends HTMLProps<'input'>,
    RatingGroupHiddenInputBaseProps {}

export const RatingGroupHiddenInput = (props: RatingGroupHiddenInputProps) => {
  const ratingGroup = useRatingGroupContext()
  const mergedProps = mergeProps(() => ratingGroup().getHiddenInputProps(), props)

  return <ark.input {...mergedProps} />
}
