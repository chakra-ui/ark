import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export interface HoverCardArrowProps extends HTMLArkProps<'div'> {}

export const HoverCardArrow: ArkComponent<'div'> = (props: HoverCardArrowProps) => {
  const hoverCard = useHoverCardContext()
  const mergedProps = mergeProps(() => hoverCard().arrowProps, props)

  return <ark.div {...mergedProps} />
}
