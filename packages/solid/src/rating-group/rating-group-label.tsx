import { ark, HTMLArkProps } from '../factory'
import { useRatingGroupContext } from './rating-group-context'

export type RatingGroupLabelProps = HTMLArkProps<'label'>

export const RatingGroupLabel = (props: RatingGroupLabelProps) => {
  const rating = useRatingGroupContext()

  return <ark.label {...rating().labelProps} {...props} />
}
