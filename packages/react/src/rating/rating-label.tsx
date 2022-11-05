import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useRatingContext } from './rating-context'

export type RatingLabelProps = HTMLAtlasProps<'label'>
export const RatingLabel = forwardRef<'label', RatingLabelProps>((props, ref) => {
  const { labelProps } = useRatingContext()
  const mergedProps = mergeProps(labelProps, props)

  return <atlas.label {...mergedProps} ref={ref} />
})
