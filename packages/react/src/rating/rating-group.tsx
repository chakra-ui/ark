import { forwardRef } from '@polymorphic-factory/react'
import type { ReactNode } from 'react'
import { atlas, HTMLAtlasProps } from '../factory'
import { RatingContext, useRatingContext } from './rating-context'

export type RatingGroupProps = Omit<HTMLAtlasProps<'div'>, 'children'> & {
  children: ReactNode | ((context: RatingContext) => ReactNode)
  renderIcon?: never
}

export const RatingGroup = forwardRef<'div', RatingGroupProps>((props, ref) => {
  const { children, ...htmlProps } = props
  const api = useRatingContext()
  const renderPropResult = typeof children === 'function' ? children(api) : children
  return (
    <atlas.div {...api.itemGroupProps} {...htmlProps} ref={ref}>
      {renderPropResult}
    </atlas.div>
  )
})
