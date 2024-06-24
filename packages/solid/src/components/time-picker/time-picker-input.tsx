import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

export interface TimePickerInputBaseProps extends PolymorphicProps<'input'> {}
export interface TimePickerInputProps
  extends Assign<HTMLProps<'input'>, TimePickerInputBaseProps> {}

export const TimePickerInput = (props: TimePickerInputProps) => {
  const timePicker = useTimePickerContext()
  const mergedProps = mergeProps(() => timePicker().getInputProps(), props)

  return <ark.input {...mergedProps} />
}
