'use client'

import { mergeProps } from '@zag-js/react'
import type { ActionTriggerProps, ActionTriggerState } from '@zag-js/timer'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useTimerContext } from './use-timer-context.ts'

export interface TimerActionTriggerState extends ActionTriggerState {}

export interface TimerActionTriggerBaseProps extends ActionTriggerProps, PolymorphicProps<TimerActionTriggerState> {}
export interface TimerActionTriggerProps extends HTMLProps<'button'>, TimerActionTriggerBaseProps {}

const splitActionTriggerProps = createSplitProps<ActionTriggerProps>()

export const TimerActionTrigger = forwardRef<HTMLButtonElement, TimerActionTriggerProps>((props, ref) => {
  const [actionTriggerProps, localProps] = splitActionTriggerProps(props, ['action'])
  const timer = useTimerContext()
  const mergedProps = mergeProps(timer.getActionTriggerProps(actionTriggerProps), localProps)

  return <ark.button {...mergedProps} ref={ref} state={timer.getActionTriggerState(actionTriggerProps)} />
})

TimerActionTrigger.displayName = 'TimerActionTrigger'
