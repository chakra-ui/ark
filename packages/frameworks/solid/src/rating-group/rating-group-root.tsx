import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { RatingGroupProvider } from './rating-group-context'
import { useRatingGroup, type UseRatingGroupProps } from './use-rating-group'

export interface RatingGroupRootProps extends Assign<HTMLArkProps<'div'>, UseRatingGroupProps> {}

export const RatingGroupRoot: ArkComponent<'div', UseRatingGroupProps> = (
  props: RatingGroupRootProps,
) => {
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
