import { mergeProps } from '@zag-js/solid'
import type { TriggerProps } from '@zag-js/hover-card'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useHoverCardContext } from './use-hover-card-context.ts'

export interface HoverCardTriggerBaseProps extends TriggerProps, PolymorphicProps<'button'> {}
export interface HoverCardTriggerProps extends Assign<HTMLProps<'button'>, HoverCardTriggerBaseProps> {}

export const HoverCardTrigger = (props: HoverCardTriggerProps) => {
  const [triggerProps, localProps] = createSplitProps<TriggerProps>()(props, ['value'])
  const hoverCard = useHoverCardContext()
  const mergedProps = mergeProps(() => hoverCard().getTriggerProps(triggerProps), localProps)

  return <ark.button {...mergedProps} />
}
