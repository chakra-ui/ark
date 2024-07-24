import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

export interface TimePickerTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface TimePickerTriggerProps
  extends Assign<HTMLProps<'button'>, TimePickerTriggerBaseProps> {}

export const TimePickerTrigger = (props: TimePickerTriggerProps) => {
  const timePicker = useTimePickerContext()
  const mergedProps = mergeProps(() => timePicker().getTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
