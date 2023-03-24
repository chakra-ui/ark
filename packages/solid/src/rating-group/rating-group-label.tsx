import { ark, type HTMLArkProps } from '../factory'
import { useRatingGroupContext } from './rating-group-context'

export type RatingGroupLabelProps = HTMLArkProps<'label'>

export const RatingGroupLabel = (props: RatingGroupLabelProps) => {
  const ratingGroup = useRatingGroupContext()

  return <ark.label {...ratingGroup().labelProps} {...props} />
}
