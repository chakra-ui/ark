import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { RatingItemContext, useRatingItemContext } from './rating-item-context'
import { ReactNode } from 'react'

export type RatingIconRenderProps =
  | {
      renderIcon?: never
      iconFull: ReactNode
      iconHalf: ReactNode
      iconEmpty: ReactNode
    }
  | {
      renderIcon: (state: RatingItemContext) => ReactNode
      iconFull?: never
      iconHalf?: never
      iconEmpty?: never
    }

export type RatingIconProps = Omit<HTMLAtlasProps<'span'>, 'children'> & RatingIconRenderProps

export const RatingIcon = forwardRef<'span', RatingIconProps>((props, ref) => {
  const { renderIcon, iconFull, iconHalf, iconEmpty, ...htmlProps } = props
  const state = useRatingItemContext()

  function getIconForState() {
    if (state.isHalf) return iconHalf
    if (state.isHighlighted) return iconFull
    return iconEmpty
  }

  const icon = renderIcon?.(state) ?? getIconForState()

  return (
    <atlas.span role="presentation" {...htmlProps} ref={ref}>
      {icon}
    </atlas.span>
  )
})
