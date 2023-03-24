import { ark, type HTMLArkProps } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardPositionerProps = HTMLArkProps<'div'>

export const HoverCardPositioner = (props: HoverCardPositionerProps) => {
  const hoverCard = useHoverCardContext()
  return <ark.div {...hoverCard().positionerProps} {...props} />
}
