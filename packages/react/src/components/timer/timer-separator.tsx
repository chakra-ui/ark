import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTimerContext } from './use-timer-context'

export interface TimerSeparatorBaseProps extends PolymorphicProps {}
export interface TimerSeparatorProps extends HTMLProps<'div'>, TimerSeparatorBaseProps {}

export const TimerSeparator = forwardRef<HTMLDivElement, TimerSeparatorProps>((props, ref) => {
  const timer = useTimerContext()

  const mergedProps = mergeProps(timer.getSeparatorProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

TimerSeparator.displayName = 'TimerSeparator'
