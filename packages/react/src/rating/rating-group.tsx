import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import { ark, HTMLArkProps } from '../factory'
import { RatingContext, useRatingContext } from './rating-context'

export type RatingGroupProps = Omit<HTMLArkProps<'div'>, 'children'> & {
  children: ReactNode | ((context: RatingContext) => ReactNode)
  renderIcon?: never
}

export const RatingGroup = forwardRef<'div', RatingGroupProps>((props, ref) => {
  const { children, ...divProps } = props
  const api = useRatingContext()
  const renderPropResult = typeof children === 'function' ? children(api) : children
  const mergedProps = mergeProps(api.itemGroupProps, divProps)

  return (
    <ark.div {...mergedProps} ref={ref}>
      {renderPropResult}
    </ark.div>
  )
})
