import type { ItemProps } from '@zag-js/rating-group'
import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useFieldContext } from '../field/index.tsx'
import { useRatingGroupContext } from './use-rating-group-context.ts'
import { RatingGroupItemProvider } from './use-rating-group-item-context.ts'

export interface RatingGroupItemBaseProps extends ItemProps, PolymorphicProps<'span'> {}
export interface RatingGroupItemProps extends HTMLProps<'span'>, RatingGroupItemBaseProps {}

export const RatingGroupItem = (props: RatingGroupItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['index'])
  const api = useRatingGroupContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)
  const itemState = createMemo(() => api().getItemState(itemProps))
  const field = useFieldContext()

  return (
    <RatingGroupItemProvider value={itemState}>
      <ark.span aria-describedby={field?.().ariaDescribedby} {...mergedProps} />
    </RatingGroupItemProvider>
  )
}
