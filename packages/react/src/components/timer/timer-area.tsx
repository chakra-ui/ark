'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTimerContext } from './use-timer-context'

export interface TimerAreaBaseProps extends PolymorphicProps {}
export interface TimerAreaProps extends HTMLProps<'div'>, TimerAreaBaseProps {}

export const TimerArea = ({ ref, ...props }: TimerAreaProps) => {
  const timer = useTimerContext()
  const mergedProps = mergeProps(timer.getAreaProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

TimerArea.displayName = 'TimerArea'
