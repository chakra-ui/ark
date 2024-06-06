import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useRatingGroupContext } from './use-rating-group-context'

export interface RatingGroupHiddenInputProps extends HTMLArkProps<'input'> {}

export const RatingGroupHiddenInput = (props: RatingGroupHiddenInputProps) => {
  const ratingGroup = useRatingGroupContext()
  const mergedProps = mergeProps(() => ratingGroup().getHiddenInputProps(), props)

  return <ark.input {...mergedProps} />
}
