import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { useRatingContext } from './rating-context'
import { RatingIcon, RatingIconRenderProps } from './rating-icon'
import { RatingItem } from './rating-item'

export type RatingItemGroupProps = HTMLAtlasProps<'div'> & RatingIconRenderProps

export const RatingItemGroup = forwardRef<'div', RatingItemGroupProps>((props, ref) => {
  const { children, renderIcon, iconEmpty, iconHalf, iconFull, ...htmlProps } = props

  const renderIconProps = renderIcon
    ? {
        renderIcon,
      }
    : {
        iconEmpty,
        iconHalf,
        iconFull,
      }

  const api = useRatingContext()

  const defaultChildren = api.sizeArray.map((index) => {
    return (
      <RatingItem key={index} index={index}>
        <RatingIcon {...renderIconProps} />
      </RatingItem>
    )
  })

  return (
    <atlas.div {...api.itemGroupProps} {...htmlProps} ref={ref}>
      {children ?? defaultChildren}
    </atlas.div>
  )
})
