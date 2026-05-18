import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useRatingGroupContext } from './use-rating-group-context.ts'

export interface RatingGroupControlBaseProps extends PolymorphicProps<'div'> {}
export interface RatingGroupControlProps extends HTMLProps<'div'>, RatingGroupControlBaseProps {}

export const RatingGroupControl = (props: RatingGroupControlProps) => {
  const ratingGroup = useRatingGroupContext()
  const mergedProps = mergeProps(() => ratingGroup().getControlProps(), props)

  return <ark.div {...mergedProps} />
}
