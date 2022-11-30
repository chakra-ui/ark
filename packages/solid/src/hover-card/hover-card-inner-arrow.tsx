import { ark, HTMLArkProps } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardInnerArrowProps = HTMLArkProps<'div'>

export const HoverCardInnerArrow = (props: HoverCardInnerArrowProps) => {
  const hoverCard = useHoverCardContext()
  return <ark.div {...hoverCard().innerArrowProps} {...props} />
}
