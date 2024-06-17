import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useRatingGroupContext } from './use-rating-group-context'

export interface RatingGroupControlBaseProps extends PolymorphicProps<'div'> {}
export interface RatingGroupControlProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    RatingGroupControlBaseProps {}

export const RatingGroupControl = (props: RatingGroupControlProps) => {
  const ratingGroup = useRatingGroupContext()
  const mergedProps = mergeProps(() => ratingGroup().getControlProps(), props)

  return <ark.div {...mergedProps} />
}
