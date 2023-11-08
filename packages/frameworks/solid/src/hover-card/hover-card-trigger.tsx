import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export interface HoverCardTriggerProps extends HTMLArkProps<'button'> {}

export const HoverCardTrigger = (props: HoverCardTriggerProps) => {
  const hoverCard = useHoverCardContext()
  const triggerProps = mergeProps(() => hoverCard().triggerProps, props)
  return <ark.button {...triggerProps} />
}
