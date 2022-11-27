import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useRatingContext } from './rating-context'

export type RatingLabelProps = HTMLArkProps<'label'>

export const RatingLabel = forwardRef<'label', RatingLabelProps>((props, ref) => {
  const { labelProps } = useRatingContext()
  const mergedProps = mergeProps(labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})
