import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { splitProps, type Assign } from '../split-props'
import { RatingProvider } from './rating-context'
import { useRating, UseRatingProps } from './use-rating'

export type RatingProps = Assign<HTMLAtlasProps<'input'>, UseRatingProps>

export const Rating = forwardRef<'input', RatingProps>((props, ref) => {
  const [useRatingProps, divProps] = splitProps(props as UseRatingProps, [
    'allowHalf',
    'autoFocus',
    'defaultValue',
    'dir',
    'disabled',
    'getRootNode',
    'ids',
    'max',
    'name',
    'onChange',
    'onHover',
    'readonly',
    'translations',
    'value',
  ])
  const rating = useRating(useRatingProps)
  const mergedProps = mergeProps(rating.rootProps, divProps)

  return (
    <RatingProvider value={rating}>
      <atlas.div {...mergedProps}>
        {props.children}
        <atlas.input {...rating.inputProps} ref={ref} />
      </atlas.div>
    </RatingProvider>
  )
})
