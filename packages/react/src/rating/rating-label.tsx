import { forwardRef } from '../forwardRef'
import { useRatingContext } from './rating-context'
import { atlas, HTMLAtlasProps } from '../factory'

export type RatingLabelProps = HTMLAtlasProps<'label'>
export const RatingLabel = forwardRef<'label', RatingLabelProps>((props, ref) => {
  const api = useRatingContext()
  return <atlas.label {...api.labelProps} {...props} ref={ref} />
})
