import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import { ark, HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { RatingContext, RatingProvider } from './rating-context'
import { useRatingGroupContext } from './rating-group-context'

export type RatingProps = Omit<HTMLArkProps<'span'>, 'children'> & {
  index: number
  children: (state: RatingContext) => ReactNode | ReactNode
}

export const Rating = forwardRef<'span', RatingProps>((props, ref) => {
  const { children, index, ...divProps } = props
  const { getRatingState, getRatingProps } = useRatingGroupContext()
  const ratingState = getRatingState(index)
  const mergedProps = mergeProps(getRatingProps({ index }), divProps)
  const view = runIfFn(children, ratingState)

  return (
    <ark.span {...mergedProps} ref={ref}>
      <RatingProvider value={ratingState}>{view}</RatingProvider>
    </ark.span>
  )
})
