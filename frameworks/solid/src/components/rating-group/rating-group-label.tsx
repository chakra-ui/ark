import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '~/factory'
import { useRatingGroupContext } from './use-rating-group-context'

export interface RatingGroupLabelProps extends HTMLArkProps<'label'> {}

export const RatingGroupLabel = (props: RatingGroupLabelProps) => {
  const api = useRatingGroupContext()
  const mergedProps = mergeProps(() => api().labelProps, props)

  return <ark.label {...mergedProps} />
}
