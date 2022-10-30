import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { useRatingContext } from './rating-context'

export type RatingLabelProps = HTMLAtlasProps<'label'>
export const RatingLabel = forwardRef<'label', RatingLabelProps>((props, ref) => {
  const api = useRatingContext()
  return <atlas.label {...api.labelProps} {...props} ref={ref} />
})
