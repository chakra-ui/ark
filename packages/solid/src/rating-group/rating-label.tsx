import { ark, HTMLArkProps } from '../factory'
import { useRatingGroupContext } from './rating-group-context'

export type RatingLabelProps = HTMLArkProps<'label'>

export const RatingLabel = (props: RatingLabelProps) => {
  const rating = useRatingGroupContext()

  return <ark.label {...rating().labelProps} {...props} />
}
