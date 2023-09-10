import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { ark } from '../factory'
import { runIfFn } from '../run-if-fn'
import { useRatingGroupContext, type RatingGroupContext } from './rating-group-context'

export type RatingGroupControlProps = Omit<ComponentPropsWithoutRef<typeof ark.div>, 'children'> & {
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
