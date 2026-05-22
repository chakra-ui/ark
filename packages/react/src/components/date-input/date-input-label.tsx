'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDateInputContext } from './use-date-input-context'

export interface DateInputLabelBaseProps extends PolymorphicProps {}
export interface DateInputLabelProps extends HTMLProps<'label'>, DateInputLabelBaseProps {}

export const DateInputLabel = ({ ref, ...props }: DateInputLabelProps) => {
  const dateInput = useDateInputContext()
  const mergedProps = mergeProps(dateInput.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
}

DateInputLabel.displayName = 'DateInputLabel'
