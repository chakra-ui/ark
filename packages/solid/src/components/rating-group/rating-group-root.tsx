import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseRatingGroupProps, useRatingGroup } from './use-rating-group'
import { RatingGroupProvider } from './use-rating-group-context'

export interface RatingGroupRootBaseProps extends UseRatingGroupProps, PolymorphicProps<'div'> {}
export interface RatingGroupRootProps extends HTMLProps<'div'>, RatingGroupRootBaseProps {}

export const RatingGroupRoot = (props: RatingGroupRootProps) => {
  const [useRatingProps, localProps] = createSplitProps<UseRatingGroupProps>()(props, [
    'allowHalf',
    'autoFocus',
    'count',
    'defaultValue',
    'disabled',
    'form',
    'id',
    'ids',
    'name',
    'onHoverChange',
    'onValueChange',
    'readOnly',
    'translations',
    'value',
  ])

  const api = useRatingGroup(useRatingProps)
  const mergedProps = mergeProps(() => api().getRootProps(), localProps)

  return (
    <RatingGroupProvider value={api}>
      <ark.div {...mergedProps} />
    </RatingGroupProvider>
  )
}
