import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useRatingGroupContext } from './use-rating-group-context'

export interface RatingGroupHiddenInputBaseProps extends PolymorphicProps<'input'> {}
export interface RatingGroupHiddenInputProps
  extends JSX.InputHTMLAttributes<HTMLInputElement>,
    RatingGroupHiddenInputBaseProps {}

export const RatingGroupHiddenInput = (props: RatingGroupHiddenInputProps) => {
  const ratingGroup = useRatingGroupContext()
  const mergedProps = mergeProps(() => ratingGroup().getHiddenInputProps(), props)

  return <ark.input {...mergedProps} />
}
