import { ark, type HTMLArkProps } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardContentProps = HTMLArkProps<'div'>

export const HoverCardContent = (props: HoverCardContentProps) => {
  const hoverCard = useHoverCardContext()
  return <ark.div {...hoverCard().contentProps} {...props} />
}
