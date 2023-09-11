import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HtmlArkProps } from '../factory'
import { type Assign } from '../types'
import { RatingGroupProvider } from './rating-group-context'
import { useRatingGroup, type UseRatingGroupProps } from './use-rating-group'

export type RatingGroupProps = Assign<HtmlArkProps<'div'>, UseRatingGroupProps>

export const RatingGroup = forwardRef<HTMLDivElement, RatingGroupProps>((props, ref) => {
  const [useRatingProps, inputProps] = createSplitProps<UseRatingGroupProps>()(props, [
    'allowHalf',
    'autoFocus',
    'defaultValue',
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
  const api = useRatingGroup(useRatingProps)
  const mergedProps = mergeProps(api.rootProps, inputProps)

  return (
    <RatingGroupProvider value={api}>
      <ark.div {...mergedProps} ref={ref} />
      <input {...api.hiddenInputProps} />
    </RatingGroupProvider>
  )
})

RatingGroup.displayName = 'RatingGroup'
