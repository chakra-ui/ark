import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { RatingProvider } from './rating-context'
import { useRating, UseRatingProps } from './use-rating'

export type RatingProps = Omit<HTMLAtlasProps<'input'>, keyof UseRatingProps> & UseRatingProps

export const Rating = forwardRef<'input', RatingProps>((props, ref) => {
  const { api, htmlProps } = useRating(props)

  return (
    <atlas.div {...api.rootProps} {...htmlProps}>
      <RatingProvider value={api}>
        {props.children}
        <atlas.input {...api.inputProps} ref={ref} />
      </RatingProvider>
    </atlas.div>
  )
})
