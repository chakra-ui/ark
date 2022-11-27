import { splitProps } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { ark, HTMLArkProps } from '../factory'
import { useRatingContext } from './rating-context'
import { RatingItemContext, RatingItemProvider } from './rating-item-context'

export type RenderIconFn = (state: RatingItemContext) => JSX.Element

export type RatingItemProps = Omit<HTMLArkProps<'span'>, 'children'> & {
  index: number
  children: JSX.Element | RenderIconFn
}

export const RatingItem = (props: RatingItemProps) => {
  const [localProps, spanProps] = splitProps(props, ['index', 'children'])

  const rating = useRatingContext()

  const state = rating().getRatingState(localProps.index)
  const icon =
    typeof localProps.children === 'function' ? localProps.children(state) : localProps.children

  return (
    <ark.span {...rating().getItemProps({ index: localProps.index })} {...spanProps}>
      <RatingItemProvider value={state}>{icon}</RatingItemProvider>
    </ark.span>
  )
}
