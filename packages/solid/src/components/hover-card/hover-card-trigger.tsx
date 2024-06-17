import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useHoverCardContext } from './use-hover-card-context'

export interface HoverCardTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface HoverCardTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    HoverCardTriggerBaseProps {}

export const HoverCardTrigger = (props: HoverCardTriggerProps) => {
  const hoverCard = useHoverCardContext()
  const mergedProps = mergeProps(() => hoverCard().getTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
