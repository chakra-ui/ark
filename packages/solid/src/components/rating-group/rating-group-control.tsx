import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useRatingGroupContext } from './use-rating-group-context.ts'
import type { ControlState } from '@zag-js/rating-group'

export interface RatingGroupControlState extends ControlState {}

export interface RatingGroupControlBaseProps extends PolymorphicProps<'div', RatingGroupControlState> {}
export interface RatingGroupControlProps extends HTMLProps<'div'>, RatingGroupControlBaseProps {}

export const RatingGroupControl = (props: RatingGroupControlProps) => {
  const ratingGroup = useRatingGroupContext()
  const mergedProps = mergeProps(() => ratingGroup().getControlProps(), props)

  return <ark.div {...mergedProps} state={ratingGroup().getControlState()} />
}
