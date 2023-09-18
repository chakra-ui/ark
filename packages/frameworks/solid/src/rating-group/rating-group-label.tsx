import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useRatingGroupContext } from './rating-group-context'

export type RatingGroupLabelProps = HTMLArkProps<'label'>

export const RatingGroupLabel = (props: RatingGroupLabelProps) => {
  const ratingGroup = useRatingGroupContext()
  const labelProps = mergeProps(() => ratingGroup().labelProps, props)
  return <ark.label {...labelProps} />
}
