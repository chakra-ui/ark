'use client'

import { mergeProps } from '@zag-js/react'
import type { TriggerProps, TriggerState } from '@zag-js/hover-card'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useHoverCardContext } from './use-hover-card-context.ts'

export interface HoverCardTriggerState extends TriggerState {}

export interface HoverCardTriggerBaseProps extends TriggerProps, PolymorphicProps<HoverCardTriggerState> {}
export interface HoverCardTriggerProps extends Assign<HTMLProps<'button'>, HoverCardTriggerBaseProps> {}

const splitTriggerProps = createSplitProps<TriggerProps>()

export const HoverCardTrigger = forwardRef<HTMLButtonElement, HoverCardTriggerProps>((props, ref) => {
  const [triggerProps, localProps] = splitTriggerProps(props, ['value'])
  const hoverCard = useHoverCardContext()
  const mergedProps = mergeProps(hoverCard.getTriggerProps(triggerProps), localProps)

  return <ark.button {...mergedProps} ref={ref} state={hoverCard.getTriggerState(triggerProps)} />
})

HoverCardTrigger.displayName = 'HoverCardTrigger'
