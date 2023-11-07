import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useRatingGroupContext, type RatingGroupContext } from './rating-group-context'

export interface RatingGroupControlProps
  extends Assign<
    HTMLArkProps<'div'>,
    { children?: ReactNode | ((props: RatingGroupContext) => ReactNode) }
  > {}

export const RatingGroupControl = forwardRef<HTMLDivElement, RatingGroupControlProps>(
  (props, ref) => {
    const { children, ...divProps } = props
    const api = useRatingGroupContext()
    const mergedProps = mergeProps(api.controlProps, divProps)
    const view = runIfFn(children, api)

    return (
      <>
        <ark.div {...mergedProps} ref={ref}>
          {view}
        </ark.div>
        <input {...api.hiddenInputProps} />
      </>
    )
  },
)

RatingGroupControl.displayName = 'RatingGroupControl'
