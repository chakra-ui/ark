import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '~/factory'
import type { Assign } from '~/types'
import { createSplitProps } from '~/utils/create-split-props'
import { type UseRatingGroupProps, useRatingGroup } from './use-rating-group'
import { RatingGroupProvider } from './use-rating-group-context'

export interface RatingGroupRootProps extends Assign<HTMLArkProps<'div'>, UseRatingGroupProps> {}

export const RatingGroupRoot = (props: RatingGroupRootProps) => {
  const [useRatingProps, localProps] = createSplitProps<UseRatingGroupProps>()(props, [
    'allowHalf',
    'autoFocus',
    'count',
    'dir',
    'disabled',
    'form',
    'getRootNode',
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
  const mergedProps = mergeProps(() => api().rootProps, localProps)

  return (
    <RatingGroupProvider value={api}>
      <ark.div {...mergedProps} />
    </RatingGroupProvider>
  )
}
