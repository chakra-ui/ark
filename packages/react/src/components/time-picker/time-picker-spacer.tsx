import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

export interface TimePickerSpacerBaseProps extends PolymorphicProps {}
export interface TimePickerSpacerProps extends HTMLProps<'div'>, TimePickerSpacerBaseProps {}

export const TimePickerSpacer = forwardRef<HTMLDivElement, TimePickerSpacerProps>((props, ref) => {
  const timePicker = useTimePickerContext()
  const mergedProps = mergeProps(timePicker.getSpacerProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

TimePickerSpacer.displayName = 'TimePickerSpacer'
