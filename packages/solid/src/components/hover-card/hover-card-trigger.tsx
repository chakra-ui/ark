import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useHoverCardContext } from './use-hover-card-context'

export interface HoverCardTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface HoverCardTriggerProps extends HTMLProps<'button'>, HoverCardTriggerBaseProps {}

export const HoverCardTrigger = (props: HoverCardTriggerProps) => {
  const hoverCard = useHoverCardContext()
  const mergedProps = mergeProps(() => hoverCard().getTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
