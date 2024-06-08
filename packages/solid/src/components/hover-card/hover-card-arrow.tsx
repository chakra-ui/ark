import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useHoverCardContext } from './use-hover-card-context'

export interface HoverCardArrowProps extends HTMLArkProps<'div'> {}

export const HoverCardArrow = (props: HoverCardArrowProps) => {
  const hoverCard = useHoverCardContext()
  const mergedProps = mergeProps(() => hoverCard().getArrowProps(), props)

  return <ark.div {...mergedProps} />
}
