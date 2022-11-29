import { children } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { useRatingContext } from './rating-context'
import { RatingItemContext, RatingItemProvider } from './rating-item-context'

export type RenderIconFn = (state: RatingItemContext) => JSX.Element

export type RatingItemProps = Omit<HTMLArkProps<'span'>, 'children'> & {
  index: number
  children: JSX.Element | RenderIconFn
}

export const RatingItem = (props: RatingItemProps) => {
  const [localProps, spanProps] = createSplitProps<{
    index: number
    children: JSX.Element | RenderIconFn
  }>()(props, ['index', 'children'])

  const rating = useRatingContext()
  const ratingState = rating().getRatingState(localProps.index)

  const icon = children(() => runIfFn(localProps.children, ratingState))

  return (
    <ark.span {...rating().getItemProps({ index: localProps.index })} {...spanProps}>
      <RatingItemProvider value={ratingState}>{icon()}</RatingItemProvider>
    </ark.span>
  )
}
