import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

export interface TimePickerClearTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface TimePickerClearTriggerProps
  extends Assign<HTMLProps<'button'>, TimePickerClearTriggerBaseProps> {}

export const TimePickerClearTrigger = (props: TimePickerClearTriggerProps) => {
  const timePicker = useTimePickerContext()
  const mergedProps = mergeProps(() => timePicker().getClearTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
