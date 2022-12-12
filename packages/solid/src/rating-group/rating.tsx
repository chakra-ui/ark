import { children } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { ark, HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { RatingContext, RatingProvider } from './rating-context'
import { useRatingGroupContext } from './rating-group-context'

export type RatingProps = Omit<HTMLArkProps<'span'>, 'children'> & {
  index: number
  children: (state: RatingContext) => JSX.Element | JSX.Element
}

export const Rating = (props: RatingProps) => {
  const rating = useRatingGroupContext()
  const ratingState = rating().getRatingState(props.index)
  const view = children(() => runIfFn(props.children, ratingState))

  return (
    <ark.span {...rating().getRatingProps({ index: props.index })} {...props}>
      <RatingProvider value={ratingState}>{view()}</RatingProvider>
    </ark.span>
  )
}
