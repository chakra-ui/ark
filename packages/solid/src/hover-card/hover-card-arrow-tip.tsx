import { ark, HTMLArkProps } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardArrowTipProps = HTMLArkProps<'div'>

export const HoverCardArrowTip = (props: HoverCardArrowTipProps) => {
  const hoverCard = useHoverCardContext()
  return <ark.div {...hoverCard().arrowTipProps} {...props} />
}
