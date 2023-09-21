import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { useRatingGroupContext, type RatingGroupContext } from './rating-group-context'

export interface RatingGroupControlProps extends Omit<HTMLArkProps<'div'>, 'children'> {
  children?: ReactNode | ((context: RatingGroupContext) => ReactNode)
}

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
      </>
    )
  },
)

RatingGroupControl.displayName = 'RatingGroupControl'
