import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { RatingContext, useRatingContext } from './rating-context'
import { ReactNode } from 'react'

export type RatingItemGroupProps = Omit<HTMLAtlasProps<'div'>, 'children'> & {
  children: ReactNode | ((context: RatingContext) => ReactNode)
  renderIcon?: never
}

export const RatingGroup = forwardRef<'div', RatingItemGroupProps>((props, ref) => {
  const { children, ...htmlProps } = props
  const api = useRatingContext()
  const renderPropResult = typeof children === 'function' ? children(api) : children
  return (
    <atlas.div {...api.itemGroupProps} {...htmlProps} ref={ref}>
      {renderPropResult}
    </atlas.div>
  )
})
