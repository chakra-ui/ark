import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useFieldContext } from '../field/index.tsx'
import { useRatingGroupContext } from './use-rating-group-context.ts'

export interface RatingGroupHiddenInputBaseProps extends PolymorphicProps<'input'> {}
export interface RatingGroupHiddenInputProps extends HTMLProps<'input'>, RatingGroupHiddenInputBaseProps {}

export const RatingGroupHiddenInput = (props: RatingGroupHiddenInputProps) => {
  const ratingGroup = useRatingGroupContext()
  const mergedProps = mergeProps(() => ratingGroup().getHiddenInputProps(), props)
  const field = useFieldContext()

  return <ark.input aria-describedby={field?.().ariaDescribedby} {...mergedProps} />
}
