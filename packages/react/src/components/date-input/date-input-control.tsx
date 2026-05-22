'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDateInputContext } from './use-date-input-context'

export interface DateInputControlBaseProps extends PolymorphicProps {}
export interface DateInputControlProps extends HTMLProps<'div'>, DateInputControlBaseProps {}

export const DateInputControl = ({ ref, ...props }: DateInputControlProps) => {
  const dateInput = useDateInputContext()
  const mergedProps = mergeProps(dateInput.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

DateInputControl.displayName = 'DateInputControl'
