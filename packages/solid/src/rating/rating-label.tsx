import { ark, HTMLArkProps } from '../factory'
import { useRatingContext } from './rating-context'

export type RatingLabelProps = HTMLArkProps<'label'>
export const RatingLabel = (props: RatingLabelProps) => {
  const rating = useRatingContext()

  return <ark.label {...rating().labelProps} {...props} />
}
