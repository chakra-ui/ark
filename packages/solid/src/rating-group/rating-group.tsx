import type { Assign } from '@polymorphic-factory/solid'
import { splitProps } from 'solid-js'
import { ark, HTMLArkProps } from '../factory'
import { RatingGroupProvider } from './rating-group-context'
import { useRatingGroup, UseRatingGroupProps } from './use-rating-group'

export type RatingGroupProps = Assign<HTMLArkProps<'input'>, UseRatingGroupProps>

export const RatingGroup = (props: RatingGroupProps) => {
  const [useRatingGroupProps, inputProps] = splitProps(props, [
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
  const ratingGroup = useRatingGroup(useRatingGroupProps)

  return (
    <RatingGroupProvider value={ratingGroup}>
      <ark.div {...ratingGroup().rootProps}>
        {props.children}
        <ark.input {...ratingGroup().hiddenInputProps} {...inputProps} />
      </ark.div>
    </RatingGroupProvider>
  )
}
