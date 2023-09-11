import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { RatingGroupProvider } from './rating-group-context'
import { useRatingGroup, type UseRatingGroupProps } from './use-rating-group'

export type RatingGroupProps = Assign<HTMLArkProps<'div'>, UseRatingGroupProps>

export const RatingGroup = (props: RatingGroupProps) => {
  const [ratingParams, localProps] = createSplitProps<UseRatingGroupProps>()(props, [
    'allowHalf',
    'autoFocus',
    'dir',
    'disabled',
    'form',
    'getRootNode',
    'id',
    'ids',
    'max',
    'name',
    'onChange',
    'onHover',
    'readOnly',
    'translations',
    'value',
  ])

  const api = useRatingGroup(ratingParams)
  const mergedProps = mergeProps(() => api().rootProps, localProps)

  return (
    <RatingGroupProvider value={api}>
      <ark.div {...mergedProps} />
      <input {...api().hiddenInputProps} />
    </RatingGroupProvider>
  )
}
