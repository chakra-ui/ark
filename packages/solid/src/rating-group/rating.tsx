import type { ItemProps } from '@zag-js/rating-group'
import { mergeProps } from '@zag-js/solid'
import type { Accessor } from 'solid-js'
import { type JSX } from 'solid-js/jsx-runtime'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { RatingProvider, type RatingContext } from './rating-context'
import { useRatingGroupContext } from './rating-group-context'

export type RatingProps = Assign<
  HTMLArkProps<'span'>,
  ItemProps & {
    children: (state: Accessor<RatingContext>) => JSX.Element | JSX.Element
  }
>

export const Rating = (props: RatingProps) => {
  const [ratingParams, restProps] = createSplitProps<ItemProps>()(props, ['index'])
  const api = useRatingGroupContext()

  const ratingState = () => api().getRatingState(ratingParams)
  const getChildren = () => runIfFn(restProps.children, ratingState)

  const ratingProps = mergeProps(() => api().getRatingProps(ratingParams), restProps)

  return (
    <ark.span {...ratingProps}>
      <RatingProvider value={ratingState}>{getChildren()}</RatingProvider>
    </ark.span>
  )
}
