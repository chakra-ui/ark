import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export interface HoverCardArrowTipProps extends HTMLArkProps<'div'> {}

export const HoverCardArrowTip: ArkComponent<'div'> = (props: HoverCardArrowTipProps) => {
  const hoverCard = useHoverCardContext()
  const mergedProps = mergeProps(() => hoverCard().arrowTipProps, props)

  return <ark.div {...mergedProps} />
}
