import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useRatingGroupContext } from './use-rating-group-context'

export interface RatingGroupControlProps extends HTMLArkProps<'div'> {}

export const RatingGroupControl = forwardRef<HTMLDivElement, RatingGroupControlProps>(
  (props, ref) => {
    const context = useRatingGroupContext()
    const mergedProps = mergeProps(context.controlProps, props)

    return (
      <>
        <ark.div {...mergedProps} ref={ref} />
        <input {...context.hiddenInputProps} />
      </>
    )
  },
)

RatingGroupControl.displayName = 'RatingGroupControl'
