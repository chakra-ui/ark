import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

export type TimePickerSpacerBaseProps = {}
export interface TimePickerSpacerProps
  extends Assign<HTMLArkProps<'div'>, TimePickerSpacerBaseProps> {}

export const TimePickerSpacer = forwardRef<HTMLDivElement, TimePickerSpacerProps>((props, ref) => {
  const timePicker = useTimePickerContext()
  const mergedProps = mergeProps(timePicker.getSpacerProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

TimePickerSpacer.displayName = 'TimePickerSpacer'
