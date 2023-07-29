import type { ItemProps } from '@zag-js/rating-group'
import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { ark } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { RatingProvider, type RatingContext } from './rating-context'
import { useRatingGroupContext } from './rating-group-context'

export type RatingProps = Assign<
  ComponentPropsWithoutRef<typeof ark.span>,
  ItemProps & {
    children: (state: RatingContext) => ReactNode | ReactNode
  }
>

export const Rating = forwardRef<HTMLSpanElement, RatingProps>((props, ref) => {
  const { children, index, ...divProps } = props
  const { getRatingState, getRatingProps } = useRatingGroupContext()
  const ratingState = getRatingState({ index })
  const mergedProps = mergeProps(getRatingProps({ index }), divProps)
  const view = runIfFn(children, ratingState)

  return (
    <ark.span {...mergedProps} ref={ref}>
      <RatingProvider value={ratingState}>{view}</RatingProvider>
    </ark.span>
  )
})

Rating.displayName = 'Rating'
