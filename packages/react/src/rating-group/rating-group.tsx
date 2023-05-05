import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { type Assign } from '../types'
import { RatingGroupProvider } from './rating-group-context'
import { useRatingGroup, type UseRatingGroupProps } from './use-rating-group'

export type RatingGroupProps = Assign<HTMLArkProps<'input'>, UseRatingGroupProps>

export const RatingGroup = forwardRef<'input', RatingGroupProps>((props, ref) => {
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
  const ratingGroup = useRatingGroup(useRatingProps)
  const mergedProps = mergeProps(ratingGroup.rootProps, inputProps)

  return (
    <RatingGroupProvider value={ratingGroup}>
      <ark.div {...mergedProps}>
        <ark.input {...ratingGroup.hiddenInputProps} ref={ref} />
        {props.children}
      </ark.div>
    </RatingGroupProvider>
  )
})
