import { mergeProps } from '@zag-js/react'
import type { TriggerProps } from '@zag-js/hover-card'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useHoverCardContext } from './use-hover-card-context'

export interface HoverCardTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface HoverCardTriggerProps extends Assign<HTMLProps<'button'>, HoverCardTriggerBaseProps> {}

const splitTriggerProps = createSplitProps<TriggerProps>()

export const HoverCardTrigger = forwardRef<HTMLButtonElement, HoverCardTriggerProps>((props, ref) => {
  const [triggerProps, localProps] = splitTriggerProps(props, ['value'])
  const hoverCard = useHoverCardContext()
  const mergedProps = mergeProps(hoverCard.getTriggerProps(triggerProps), localProps)

  return <ark.button {...mergedProps} ref={ref} />
})

HoverCardTrigger.displayName = 'HoverCardTrigger'
