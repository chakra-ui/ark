import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useRatingGroupContext } from './rating-group-context'

export interface RatingGroupLabelProps extends HTMLArkProps<'label'> {}

export const RatingGroupLabel: ArkComponent<'label'> = (props: RatingGroupLabelProps) => {
  const api = useRatingGroupContext()
  const mergedProps = mergeProps(() => api().labelProps, props)

  return <ark.label {...mergedProps} />
}
