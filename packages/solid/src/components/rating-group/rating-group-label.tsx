import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useRatingGroupContext } from './use-rating-group-context'

export interface RatingGroupLabelBaseProps extends PolymorphicProps<'label'> {}
export interface RatingGroupLabelProps
  extends JSX.LabelHTMLAttributes<HTMLLabelElement>,
    RatingGroupLabelBaseProps {}

export const RatingGroupLabel = (props: RatingGroupLabelProps) => {
  const api = useRatingGroupContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
