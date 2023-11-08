import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export interface HoverCardArrowProps extends HTMLArkProps<'div'> {}

export const HoverCardArrow = (props: HoverCardArrowProps) => {
  const hoverCard = useHoverCardContext()
  const arrowProps = mergeProps(() => hoverCard().arrowProps, props)
  return <ark.div {...arrowProps} />
}
