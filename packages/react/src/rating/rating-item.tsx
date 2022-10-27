import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { useRatingContext } from './rating-context'
import { RatingItemProvider } from './rating-item-context'

export type RatingItemProps = HTMLAtlasProps<'span'> & { index: number }

export const RatingItem = forwardRef<'span', RatingItemProps>((props, ref) => {
  const { children, index, ...htmlProps } = props
  const api = useRatingContext()
  const state = api.getRatingState(index)

  return (
    <atlas.span {...api.getItemProps({ index })} {...htmlProps} ref={ref}>
      <RatingItemProvider value={state}>{children}</RatingItemProvider>
    </atlas.span>
  )
})
