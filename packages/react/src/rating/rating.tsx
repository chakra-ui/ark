import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { splitProps, type Assign } from '../split-props'
import { RatingProvider } from './rating-context'
import { useRating, UseRatingProps } from './use-rating'

export type RatingProps = Assign<HTMLAtlasProps<'input'>, UseRatingProps>

export const Rating = forwardRef<'input', RatingProps>((props, ref) => {
  const [useRatingProps, htmlProps] = splitProps(props as UseRatingProps, [
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

  return (
    <RatingProvider value={rating}>
      <atlas.div {...rating.rootProps} {...htmlProps}>
        {props.children}
        <atlas.input {...rating.inputProps} ref={ref} />
      </atlas.div>
    </RatingProvider>
  )
})
