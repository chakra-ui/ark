import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useRatingGroupContext } from './rating-group-context'

export type RatingGroupLabelProps = HtmlArkProps<'label'>

export const RatingGroupLabel = forwardRef<HTMLLabelElement, RatingGroupLabelProps>(
  (props, ref) => {
    const { labelProps } = useRatingGroupContext()
    const mergedProps = mergeProps(labelProps, props)

    return <ark.label {...mergedProps} ref={ref} />
  },
)

RatingGroupLabel.displayName = 'RatingGroupLabel'
