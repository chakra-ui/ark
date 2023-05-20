import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { RatingGroupProvider } from './rating-group-context'
import { useRatingGroup, type UseRatingGroupProps } from './use-rating-group'

export type RatingGroupProps = Assign<HTMLArkProps<'div'>, UseRatingGroupProps>

export const RatingGroup = (props: RatingGroupProps) => {
  const [ratingParams, restProps] = createSplitProps<UseRatingGroupProps>()(props, [
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

  const rootProps = mergeProps(() => api().rootProps, restProps)

  return (
    <RatingGroupProvider value={api}>
      <ark.div {...rootProps}>
        {restProps.children}
        <ark.input {...api().hiddenInputProps} />
      </ark.div>
    </RatingGroupProvider>
  )
}
