import { ark, HTMLArkProps } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardArrowProps = HTMLArkProps<'div'>

export const HoverCardArrow = (props: HoverCardArrowProps) => {
  const hoverCard = useHoverCardContext()
  return <ark.div {...hoverCard().arrowProps} {...props} />
}
