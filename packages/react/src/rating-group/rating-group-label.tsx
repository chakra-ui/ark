import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useRatingGroupContext } from './rating-group-context'

export type RatingGroupLabelProps = HTMLArkProps<'label'>

export const RatingGroupLabel = forwardRef<'label', RatingGroupLabelProps>((props, ref) => {
  const { labelProps } = useRatingGroupContext()
  const mergedProps = mergeProps(labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})
