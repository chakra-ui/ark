'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTimerContext } from './use-timer-context'

export interface TimerControlBaseProps extends PolymorphicProps {}
export interface TimerControlProps extends HTMLProps<'div'>, TimerControlBaseProps {}

export const TimerControl = ({ ref, ...props }: TimerControlProps) => {
  const timer = useTimerContext()
  const mergedProps = mergeProps(timer.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

TimerControl.displayName = 'TimerControl'
