import { forwardRef } from '@polymorphic-factory/react'
import type { ReactNode } from 'react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useRatingContext } from './rating-context'
import { RatingItemContext, RatingItemProvider } from './rating-item-context'

export type RenderIconFn = (state: RatingItemContext) => ReactNode

export type RatingItemProps = Omit<HTMLAtlasProps<'span'>, 'children'> & {
  index: number
  children: ReactNode | RenderIconFn
}

export const RatingItem = forwardRef<'span', RatingItemProps>((props, ref) => {
  const { children, index, ...htmlProps } = props
  const api = useRatingContext()
  const state = api.getRatingState(index)
  const icon = typeof children === 'function' ? children(state) : children

  return (
    <atlas.span {...api.getItemProps({ index })} {...htmlProps} ref={ref}>
      <RatingItemProvider value={state}>{icon}</RatingItemProvider>
    </atlas.span>
  )
})
