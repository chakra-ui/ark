import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useRatingGroupContext } from './rating-group-context'

export interface RatingGroupLabelProps extends HTMLArkProps<'label'> {}

export const RatingGroupLabel = forwardRef<HTMLLabelElement, RatingGroupLabelProps>(
  (props, ref) => {
    const api = useRatingGroupContext()
    const mergedProps = mergeProps(api.labelProps, props)

    return <ark.label {...mergedProps} ref={ref} />
  },
)

RatingGroupLabel.displayName = 'RatingGroupLabel'
