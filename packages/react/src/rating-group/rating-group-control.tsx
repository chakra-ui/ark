import { mergeProps } from '@zag-js/react'
import { type ReactNode } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { runIfFn } from '../run-if-fn'
import { useRatingGroupContext, type RatingGroupContext } from './rating-group-context'

export type RatingGroupControlProps = Omit<HTMLArkProps<'div'>, 'children'> & {
  children: ReactNode | ((context: RatingGroupContext) => ReactNode)
}

export const RatingGroupControl = forwardRef<'div', RatingGroupControlProps>((props, ref) => {
  const { children, ...divProps } = props
  const ratingGroup = useRatingGroupContext()
  const mergedProps = mergeProps(ratingGroup.controlProps, divProps)
  const view = runIfFn(children, ratingGroup)

  return (
    <ark.div {...mergedProps} ref={ref}>
      {view}
    </ark.div>
  )
})
