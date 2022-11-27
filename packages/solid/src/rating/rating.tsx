import type { Assign } from '@polymorphic-factory/solid'
import { splitProps } from 'solid-js'
import { ark, HTMLArkProps } from '../factory'
import { RatingProvider } from './rating-context'
import { useRating, UseRatingProps } from './use-rating'

export type RatingProps = Assign<HTMLArkProps<'input'>, UseRatingProps>

export const Rating = (props: RatingProps) => {
  const [useRatingProps, inputProps] = splitProps(props, [
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
  const rating = useRating(useRatingProps)

  return (
    <RatingProvider value={rating}>
      <ark.div {...rating().rootProps}>
        {props.children}
        <ark.input {...rating().inputProps} {...inputProps} />
      </ark.div>
    </RatingProvider>
  )
}
