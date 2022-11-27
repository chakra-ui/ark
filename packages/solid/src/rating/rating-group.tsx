import type { JSX } from 'solid-js/jsx-runtime'
import { ark, HTMLArkProps } from '../factory'
import { RatingContext, useRatingContext } from './rating-context'

export type RatingGroupProps = Omit<HTMLArkProps<'div'>, 'children'> & {
  children: JSX.Element | ((context: RatingContext) => JSX.Element)
  renderIcon?: never
}

export const RatingGroup = (props: RatingGroupProps) => {
  const { children, ...divProps } = props
  const rating = useRatingContext()
  const renderPropResult = typeof children === 'function' ? children(rating) : children

  return (
    <ark.div {...rating().itemGroupProps} {...divProps}>
      {renderPropResult}
    </ark.div>
  )
}
